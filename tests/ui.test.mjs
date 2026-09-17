import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
let server;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
});
after(async () => server?.close());
const user = {
  id: "customer",
  name: "Test Customer",
  email: "test@example.com",
  town: "Kandy",
};
const worker = {
  id: "worker",
  name: "Test Worker",
  town: "Kandy",
  trade: "Plumbing",
  rating: 0,
  profileReviewsCount: 0,
  reviewsCount: 0,
  avatar: "/wrench.svg",
  about: "Repair work",
  shortDesc: "Repair work",
  experience: "1 year",
  languages: ["Sinhala"],
  availability: "Ask for availability",
  services: ["Plumbing"],
  previousWork: [],
  reviews: [],
  serviceAreas: [],
  workPhotos: [],
};
const quote = {
  id: "quote",
  workerId: "worker",
  workerName: worker.name,
  workerTown: "Kandy",
  workerAvatar: "/wrench.svg",
  workerRating: 0,
  workerReviewsCount: 0,
  amount: 4500,
  includes: "Labour",
  inclusionsDetails: "Labour",
  appointmentDate: "2099-01-01",
  appointmentTime: "Morning",
  availability: "Morning",
  status: "accepted",
};
const job = {
  id: "job",
  title: "Repair the kitchen tap",
  description: "Replace the tap in the kitchen.",
  customer_id: "customer",
  customer: { name: user.name, memberSince: "2026" },
  town: "Kandy",
  category: "Plumbing",
  tradeCategory: "plumbing",
  budget: 5000,
  photos: ["/wrench.svg"],
  status: "in_progress",
  quotes: [quote],
  hiredQuote: quote,
  questions: [],
  postedDate: "Today",
  postedTime: "Today",
  timing: "Flexible",
};
async function render(name, props) {
  const { default: Component } = await server.ssrLoadModule(
    `/src/components/${name}.jsx`,
  );
  return renderToString(React.createElement(Component, props));
}
test("all connected pages render with empty or real-shaped data", async () => {
  for (const [page, props] of [
    ["HomePage", { jobs: [] }],
    ["FindWorkPage", { jobs: [], selectedTown: "All" }],
    ["CustomerDashboard", { jobs: [] }],
    ["CustomerDashboard", { jobs: [job] }],
    ["WorkerDashboard", { jobs: [job], currentUser: { id: "worker" } }],
    ["WorkerDirectoryPage", { workers: [] }],
    ["WorkerProfilePage", { workers: [worker], workerId: "worker" }],
    ["WorkerProfilePage", { workers: [], workerId: "absent" }],
    ["PostJobPage", {}],
    ["SendQuotePage", { job, currentUser: user }],
    ["JobDetailView", { job, currentUser: user }],
    ["CompareQuotesPage", { job }],
    ["ManageHiredJobPage", { job, currentUser: user }],
    ["WorkerProfileSetupPage", { currentUser: user, profile: worker }],
    ["AccountSettingsAndHelpPage", { currentUser: user }],
    ["AuthModalOrPage", {}],
    ["AuthModalOrPage", { initialMode: "recovery" }],
    ["MessagesPage", { conversations: [] }],
    [
      "MessagesPage",
      {
        conversations: [
          {
            id: "conversation",
            workerId: "worker",
            participantName: worker.name,
            participantAvatar: "TW",
            jobTitle: job.title,
            jobStatus: "in_progress",
            acceptedQuote: 4500,
            yourBudget: 5000,
            messages: [{ id: "m", sender: "me", text: "Hello", time: "Now" }],
          },
        ],
      },
    ],
  ]) {
    const html = await render(page, props);
    assert.ok(html.length > 0, page);
    assert.doesNotMatch(html, /Kasun Perera|Saman Kumara|076 123 4567/, page);
  }
});
test("hired-job page displays the accepted quote instead of the first quote", async () => {
  const html = await render("ManageHiredJobPage", {
    job: {
      ...job,
      quotes: [
        { ...quote, workerName: "Wrong Worker", status: "not_selected" },
        quote,
      ],
    },
    currentUser: user,
  });
  assert.match(html, /Test Worker/);
  assert.doesNotMatch(html, /Wrong Worker/);
});
