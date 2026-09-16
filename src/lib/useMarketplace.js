import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";
import { loadMarketplace, mutate } from "./marketplace";
const empty = { jobs: [], workers: [], conversations: [], currentUser: null };
export function useMarketplace({ pollMessages = false } = {}) {
  const [authVersion, setAuthVersion] = useState(0);
  const [data, setData] = useState(empty);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [recovery, setRecovery] = useState(false);
  const generation = useRef(0),
    userRef = useRef(null),
    busyRef = useRef(false);
  const refresh = useCallback(async () => {
    const version = ++generation.current;
    try {
      const next = await loadMarketplace(userRef.current);
      if (version === generation.current) {
        setData(next);
        setError("");
      }
      return next;
    } catch (e) {
      if (version === generation.current) setError(e.message);
      throw e;
    } finally {
      if (version === generation.current) setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!supabase) return;
    let alive = true,
      initialized = false,
      authEventSeen = false;
    const apply = (user) => {
      if (!alive || (initialized && userRef.current?.id === user?.id)) return;
      initialized = true;
      generation.current++;
      userRef.current = user;
      setData(empty);
      setLoading(true);
      setAuthVersion((v) => v + 1);
    };
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      authEventSeen = true;
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
      apply(session?.user || null);
    });
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) setError(error.message);
        if (!authEventSeen) apply(data.session?.user || null);
      })
      .catch((e) => {
        if (alive) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => {
      alive = false;
      generation.current++;
      subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (!supabase || !authVersion) return;
    refresh().catch(() => {});
  }, [authVersion, refresh]);
  useEffect(() => {
    if (!supabase || !authVersion) return;
    const update = () => {
      if (document.visibilityState === "visible" && !busyRef.current)
        refresh().catch(() => {});
    };
    document.addEventListener("visibilitychange", update);
    const timer = pollMessages ? setInterval(update, 30000) : null;
    return () => {
      document.removeEventListener("visibilitychange", update);
      if (timer) clearInterval(timer);
    };
  }, [authVersion, refresh, pollMessages]);
  const act = async (command, payload) => {
    if (busyRef.current) return null;
    busyRef.current = true;
    setBusy(true);
    setError("");
    try {
      const result = await mutate(command, payload);
      // A successful write must not be reported as failed if refreshing then fails.
      try {
        await refresh();
      } catch {
        setError(
          "Saved successfully, but refreshing failed. Use Retry to load the latest data.",
        );
      }
      return result;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };
  return {
    ...data,
    loading,
    busy,
    error,
    setError,
    act,
    refresh,
    recovery,
    setRecovery,
  };
}
