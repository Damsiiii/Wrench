import { requireBackend } from "./supabase";
const placeholder = `${import.meta.env.BASE_URL}wrench.svg`;
export async function mutate(command, payload = {}) {
  const { data, error } = await requireBackend().rpc("marketplace", {
    command,
    payload,
  });
  if (error) throw new Error(error.message);
  return data;
}
async function rows(table) {
  const client = requireBackend();
  const result = [];
  const primaryKey =
    table === "job_addresses"
      ? "job_id"
      : table === "saved_jobs"
        ? "job_id"
        : "id";
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await client
      .from(table)
      .select("*")
      .order(primaryKey)
      .range(offset, offset + 999);
    if (error) throw new Error(error.message);
    result.push(...data);
    if (data.length < 1000) return result;
  }
}
const date = (v) => (v ? new Date(v).toLocaleDateString("en-LK") : "");
export async function loadMarketplace(user) {
  const tables = [
    "profiles",
    "workers",
    "jobs",
    "reviews",
    "questions",
    ...(user
      ? [
          "quotes",
          "job_addresses",
          "saved_jobs",
          "account_settings",
          "conversations",
          "messages",
        ]
      : []),
  ];
  const values = await Promise.all(tables.map(rows));
  const db = Object.fromEntries(tables.map((t, i) => [t, values[i]]));
  const profiles = Object.fromEntries(db.profiles.map((p) => [p.id, p]));
  const workers = db.workers.map((w) => {
    const p = profiles[w.id] || {};
    const reviews = db.reviews
      .filter((r) => r.worker_id === w.id)
      .map((r) => ({
        ...r,
        author: profiles[r.customer_id]?.name || "Customer",
        town: profiles[r.customer_id]?.town || "",
        date: date(r.created_at),
      }));
    return {
      ...w,
      name: p.name || "Worker",
      town: p.town || "",
      avatar: p.avatar || placeholder,
      rating: reviews.length
        ? Number(
            (
              reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
            ).toFixed(1),
          )
        : 0,
      reviewsCount: reviews.length,
      profileReviewsCount: reviews.length,
      reviews,
      shortDesc: w.about,
      availability: "Ask for availability",
      services: [w.trade],
      previousWork: w.photos.map((image) => ({ image, title: w.trade })),
      serviceAreas: w.service_areas,
      workPhotos: w.photos,
      displayName: p.name,
    };
  });
  const workerMap = Object.fromEntries(workers.map((w) => [w.id, w]));
  const quotes = (db.quotes || []).map((q) => {
    const w = workerMap[q.worker_id] || {};
    return {
      ...q,
      workerId: q.worker_id,
      workerName: w.name || "Worker",
      workerAvatar: w.avatar || placeholder,
      workerTown: w.town || "",
      workerRating: w.rating || 0,
      workerReviewsCount: w.reviewsCount || 0,
      amount: Number(q.amount),
      appointmentDate: q.appointment_date,
      appointmentTime: q.appointment_time,
      availability: `${q.appointment_date} ${q.appointment_time}`,
      inclusionsDetails: q.includes,
    };
  });
  const jobs = db.jobs
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map((j) => {
      const p = profiles[j.customer_id] || {};
      const qs = quotes.filter((q) => q.job_id === j.id);
      return {
        ...j,
        budget: j.budget === null ? 0 : Number(j.budget),
        budgetUnknown: j.budget === null,
        tradeCategory: j.category === 'AC & Appliances' ? 'appliances' : j.category.toLowerCase(),
        photos: j.photos.length ? j.photos : [placeholder],
        jobCode: `Job #${j.id.slice(0, 8)}`,
        postedTime: date(j.created_at),
        postedDate: date(j.created_at),
        isUrgent: j.timing === "Urgent",
        materials: "Confirm materials with the customer.",
        additionalDetails: "",
        customer: {
          id: p.id,
          name: p.name || "Customer",
          town: p.town,
          memberSince: p.created_at?.slice(0, 4),
          verified: false,
        },
        quotes: qs,
        hiredQuote: qs.find((q) => q.status === "accepted") || null,
        address:
          db.job_addresses?.find((a) => a.job_id === j.id)?.address || "",
        review: db.reviews.find((r) => r.job_id === j.id),
        saved: db.saved_jobs?.some((s) => s.job_id === j.id) || false,
        questions: db.questions
          .filter((q) => q.job_id === j.id)
          .map((q) => ({
            ...q,
            asker: profiles[q.author_id]?.name || "Member",
            time: date(q.created_at),
            reply: null,
          })),
      };
    });
  const conversations = (db.conversations || []).map((c) => {
    const other =
      profiles[c.customer_id === user.id ? c.worker_id : c.customer_id] || {};
    const j = jobs.find((j) => j.id === c.job_id);
    const messages = (db.messages || [])
      .filter((m) => m.conversation_id === c.id)
      .sort((a, b) => a.created_at.localeCompare(b.created_at))
      .map((m) => ({
        ...m,
        sender: m.sender_id === user.id ? "me" : "other",
        time: new Date(m.created_at).toLocaleString("en-LK"),
      }));
    return {
      ...c,
      workerId: c.worker_id,
      participantName: other.name || "Member",
      participantAvatar: (other.name || "M").slice(0, 2),
      participantTown: other.town,
      participantRole: c.customer_id === user.id ? "Worker" : "Customer",
      jobTitle: j?.title || "Job",
      jobStatus: j?.status,
      jobCustomer: j?.customer.name,
      jobLocation: j?.town,
      acceptedQuote: j?.hiredQuote?.amount || 0,
      yourBudget: j?.budget || 0,
      messages,
      lastMessage: messages.at(-1)?.text || "Start a conversation",
      lastTime: messages.at(-1)?.time || "",
    };
  });
  const p = user ? profiles[user.id] : null;
  const settings = db.account_settings?.[0];
  return {
    jobs,
    workers,
    conversations,
    currentUser: user
      ? {
          ...p,
          ...settings,
          id: user.id,
          email: user.email,
          name: p?.name || "Member",
          role: workerMap[user.id] ? "worker" : "customer",
        }
      : null,
  };
}
export async function uploadImage(file) {
  if (
    !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 2 * 1024 * 1024
  )
    throw new Error("Choose a JPG, PNG or WebP under 2 MB.");
  const client = requireBackend();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) throw new Error("Sign in before uploading.");
  const extension = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  }[file.type];
  const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage
    .from("marketplace-images")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  return client.storage.from("marketplace-images").getPublicUrl(path).data
    .publicUrl;
}
