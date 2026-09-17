import React, { useState } from "react";
import { uploadImage } from "../lib/marketplace";
export function Page({ title, children }) {
  return (
    <section className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold mb-6">{title}</h1>
      {children}
    </section>
  );
}
export function Field({ label, ...props }) {
  return (
    <label className="block my-4 font-semibold">
      {label}
      <input
        className="block w-full mt-2 p-3 border border-slate-300 rounded-lg font-normal"
        {...props}
      />
    </label>
  );
}
export function Button({ children, ...props }) {
  return (
    <button
      className="rounded-lg bg-[#008272] text-white px-5 py-3 my-2 mr-3 font-bold disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}
export function Photos({ value, onChange, max = 3 }) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <div className="my-4">
      <p>Photos (optional, public • up to {max})</p>
      <div className="flex gap-3">
        {value.map((url) => (
          <button
            type="button"
            key={url}
            title="Remove photo"
            onClick={() => onChange(value.filter((v) => v !== url))}
          >
            <img className="w-24 h-24 object-cover rounded" src={url} />
          </button>
        ))}
      </div>
      <input
        aria-label="Upload photo"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={busy || value.length >= max}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          setError("");
          try {
            onChange([...value, await uploadImage(file)]);
          } catch (e) {
            setError(e.message);
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
      {busy && <p>Uploading…</p>}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
