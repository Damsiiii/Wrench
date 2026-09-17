import React, { useState } from "react";
import Navbar, { WrenchLogo } from "./components/Navbar";
import MobileBottomNav from "./components/MobileBottomNav";

// Pages matching 15 Reference Boards
import HomePage from "./components/HomePage";
import FindWorkPage from "./components/FindWorkPage";
import JobDetailView from "./components/JobDetailView";
import PostJobPage from "./components/PostJobPage";
import SendQuotePage from "./components/SendQuotePage";
import CompareQuotesPage from "./components/CompareQuotesPage";
import CustomerDashboard from "./components/CustomerDashboard";
import WorkerDashboard from "./components/WorkerDashboard";
import ManageHiredJobPage from "./components/ManageHiredJobPage";
import WorkerDirectoryPage from "./components/WorkerDirectoryPage";
import WorkerProfilePage from "./components/WorkerProfilePage";
import AuthModalOrPage from "./components/AuthModalOrPage";
import WorkerProfileSetupPage from "./components/WorkerProfileSetupPage";
import MessagesPage from "./components/MessagesPage";
import AccountSettingsAndHelpPage from "./components/AccountSettingsAndHelpPage";

import { useMarketplace } from "./lib/useMarketplace";
import { supabase } from "./lib/supabase";

export default function App() {
  const [requestedTab, setActiveTab] = useState("home");
  const {
    jobs,
    workers,
    conversations,
    currentUser,
    loading,
    busy,
    error,
    setError,
    act,
    refresh,
    recovery,
    setRecovery,
  } = useMarketplace({ pollMessages: requestedTab === "messages" });
  const [userRole, setUserRole] = useState("customer");
  const [selectedJobRef, setSelectedJob] = useState(null);
  const selectedJob = jobs.find((j) => j.id === selectedJobRef?.id) || null;
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [selectedTown, setSelectedTown] = useState("All");
  const [conversationId, setConversationId] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [contactWorker, setContactWorker] = useState(null);
  const [contactJobId, setContactJobId] = useState("");
  const startWorkerContact = (worker, invite) => {
    if (!currentUser) {
      setActiveTab("auth");
      return;
    }
    const own = jobs.filter(
      (j) => j.customer_id === currentUser.id && j.status === "open",
    );
    if (!own.length) {
      setError("Post a job first so this worker knows what you need.");
      setEditingJob(null);
      setActiveTab("post_job");
      return;
    }
    setContactJobId(own[0].id);
    setContactWorker({ id: worker.id, name: worker.name, invite });
  };

  const privateTabs = [
    "post_job",
    "send_quote",
    "compare_quotes",
    "customer_dashboard",
    "worker_dashboard",
    "manage_hired_job",
    "worker_setup",
    "messages",
    "settings_help",
  ];
  let activeTab = recovery
    ? "auth"
    : !currentUser && privateTabs.includes(requestedTab)
      ? "auth"
      : requestedTab;
  if (
    [
      "job_details",
      "send_quote",
      "compare_quotes",
      "manage_hired_job",
    ].includes(activeTab) &&
    !selectedJob
  )
    activeTab = "find_work";
  const handleCreateJob = async (newJob) => {
    const result = await act(editingJob ? "edit_job" : "create_job", {
      ...newJob,
      ...(editingJob ? { jobId: editingJob.id } : {}),
    });
    if (result) {
      setSelectedJob(result);
      setEditingJob(null);
      setActiveTab("customer_dashboard");
    }
    return Boolean(result);
  };
  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setActiveTab("job_details");
  };
  const handleSubmitQuote = async (jobId, quote) => {
    const result = await act("submit_quote", { ...quote, jobId });
    if (result) {
      setUserRole("worker");
      setActiveTab("worker_dashboard");
    }
    return Boolean(result);
  };
  const handleChooseWorker = async (jobId, quote) => {
    if (await act("accept_quote", { jobId, quoteId: quote.id }))
      setActiveTab("manage_hired_job");
  };
  const handleAddQuestion = async (jobId, question) =>
    Boolean(await act("question", { jobId, text: question.text }));
  const openMessages = async (workerId, jobId = selectedJob?.id) => {
    if (!currentUser) {
      setActiveTab("auth");
      return;
    }
    if (!jobId || !workerId) {
      setError("Select a job and worker before starting a conversation.");
      return;
    }
    const result = await act("open_conversation", { jobId, workerId });
    if (result) {
      setConversationId(result.id);
      setActiveTab("messages");
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfc] text-slate-900 font-sans antialiased pb-16 md:pb-0">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenPostJob={() => {
          setEditingJob(null);
          setActiveTab("post_job");
        }}
        onOpenSignIn={() => setActiveTab("auth")}
        currentUser={currentUser}
        jobCount={jobs.length}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {!supabase && (
          <div role="status" className="p-4 bg-amber-50 text-center">
            Wrench is not connected to its backend yet. No sample accounts or
            jobs are shown.
          </div>
        )}
        {error && (
          <div role="alert" className="p-4 bg-red-50 text-red-800">
            {error}
            <button className="ml-4 underline" onClick={() => setError("")}>
              Dismiss
            </button>
            <button
              className="ml-4 underline"
              onClick={() => refresh().catch(() => {})}
            >
              Retry
            </button>
          </div>
        )}
        {loading && (
          <p role="status" className="p-6 text-center">
            Loading…
          </p>
        )}
        {busy && (
          <p role="status" className="p-2 text-center">
            Saving…
          </p>
        )}
        {!loading && (
          <fieldset disabled={busy} className="min-w-0">
            {contactWorker && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Choose a job"
                className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
              >
                <form
                  className="bg-white rounded-2xl p-6 max-w-md w-full"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const result = await act(
                      contactWorker.invite
                        ? "invite_worker"
                        : "open_conversation",
                      { jobId: contactJobId, workerId: contactWorker.id },
                    );
                    if (result) {
                      setConversationId(result.id);
                      setContactWorker(null);
                      setActiveTab("messages");
                    }
                  }}
                >
                  <h2 className="text-xl font-bold">
                    Contact {contactWorker.name}
                  </h2>
                  <label className="block mt-4">
                    Choose your job
                    <select
                      className="block w-full border rounded-lg p-3 my-3"
                      value={contactJobId}
                      onChange={(e) => setContactJobId(e.target.value)}
                    >
                      {jobs
                        .filter(
                          (j) =>
                            j.customer_id === currentUser?.id &&
                            j.status === "open",
                        )
                        .map((j) => (
                          <option key={j.id} value={j.id}>
                            {j.title}
                          </option>
                        ))}
                    </select>
                  </label>
                  <button className="btn-primary">
                    {contactWorker.invite
                      ? "Send invitation"
                      : "Open conversation"}
                  </button>
                  <button
                    type="button"
                    className="ml-4"
                    onClick={() => setContactWorker(null)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
            {/* 01 Home */}
            {activeTab === "home" && (
              <HomePage
                jobs={jobs.filter((j) => j.status === "open")}
                onNavigateToFindWork={() => setActiveTab("find_work")}
                onNavigateToPostJob={() => {
                  setEditingJob(null);
                  setActiveTab("post_job");
                }}
                onSelectJob={handleSelectJob}
                onSelectTown={(town) => setSelectedTown(town)}
              />
            )}

            {/* 02 Find Work */}
            {activeTab === "find_work" && (
              <FindWorkPage
                jobs={jobs.filter((j) => j.status === "open")}
                onSelectJob={handleSelectJob}
                selectedTown={selectedTown}
                setSelectedTown={setSelectedTown}
              />
            )}

            {/* 03 Job Details */}
            {activeTab === "job_details" && (
              <JobDetailView
                job={selectedJob}
                onBack={() => setActiveTab("find_work")}
                onOpenSendQuote={(job) => {
                  setSelectedJob(job);
                  setActiveTab(
                    currentUser?.role === "worker"
                      ? "send_quote"
                      : "worker_setup",
                  );
                }}
                onOpenMessages={() =>
                  openMessages(selectedJob?.hiredQuote?.workerId)
                }
                userRole={userRole}
                onAddQuestion={handleAddQuestion}
                onSaveJob={async (saved) =>
                  Boolean(
                    await act("save_job", { jobId: selectedJob.id, saved }),
                  )
                }
                currentUser={currentUser}
                key={selectedJob.id}
              />
            )}

            {/* 04 Post a Job */}
            {activeTab === "post_job" && (
              <PostJobPage
                key={editingJob?.id || "new"}
                initialJob={editingJob}
                onSubmitJob={handleCreateJob}
                onCancel={() => setActiveTab("home")}
              />
            )}

            {/* 05 Send a Quote */}
            {activeTab === "send_quote" && (
              <SendQuotePage
                job={selectedJob}
                currentUser={currentUser}
                onBack={() => setActiveTab("job_details")}
                onSubmitQuote={handleSubmitQuote}
              />
            )}

            {/* 06 Compare Quotes */}
            {activeTab === "compare_quotes" && (
              <CompareQuotesPage
                job={selectedJob}
                onChooseWorker={handleChooseWorker}
                onViewWorkerProfile={(workerId) => {
                  setSelectedWorkerId(workerId);
                  setActiveTab("worker_profile");
                }}
                onOpenMessages={(quote) => openMessages(quote.workerId)}
                onEditJob={() => {
                  setEditingJob(selectedJob);
                  setActiveTab("post_job");
                }}
              />
            )}

            {/* 07 Customer Dashboard */}
            {activeTab === "customer_dashboard" && (
              <CustomerDashboard
                jobs={jobs.filter((j) => j.customer_id === currentUser?.id)}
                onCancelJob={(job) => {
                  if (confirm("Cancel this job?"))
                    act("cancel_job", { jobId: job.id });
                }}
                onSelectJob={handleSelectJob}
                onOpenPostJob={() => {
                  setEditingJob(null);
                  setActiveTab("post_job");
                }}
                onCompareQuotes={(job) => {
                  setSelectedJob(job);
                  setActiveTab("compare_quotes");
                }}
                onManageHiredJob={(job) => {
                  setSelectedJob(job);
                  setActiveTab("manage_hired_job");
                }}
                onLeaveReview={(job) => {
                  setSelectedJob(job);
                  setActiveTab("manage_hired_job");
                }}
                onOpenHelp={() => setActiveTab("settings_help")}
              />
            )}

            {/* 08 Worker Dashboard */}
            {activeTab === "worker_dashboard" && (
              <WorkerDashboard
                jobs={jobs}
                currentUser={currentUser}
                onWithdraw={(jobId, quoteId) =>
                  act("withdraw_quote", { jobId, quoteId })
                }
                onNavigateToFindWork={() => setActiveTab("find_work")}
                onSelectJob={handleSelectJob}
                onManageHiredJob={(job) => {
                  const fullJob = jobs.find((j) => j.id === job.id) || job;
                  setSelectedJob(fullJob);
                  setActiveTab("manage_hired_job");
                }}
              />
            )}

            {/* 09 Manage Hired Job & Review */}
            {activeTab === "manage_hired_job" && (
              <ManageHiredJobPage
                key={selectedJob.id}
                currentUser={currentUser}
                onComplete={() =>
                  act("complete_job", { jobId: selectedJob.id })
                }
                onCancelJob={async () => {
                  if (await act("cancel_job", { jobId: selectedJob.id }))
                    setActiveTab("customer_dashboard");
                }}
                onReview={(rating, text) =>
                  act("review", { jobId: selectedJob.id, rating, text })
                }
                onSaveAddress={(address) =>
                  act("save_address", { jobId: selectedJob.id, address })
                }
                job={selectedJob}
                onBack={() =>
                  setActiveTab(
                    userRole === "customer"
                      ? "customer_dashboard"
                      : "worker_dashboard",
                  )
                }
                onOpenMessages={() =>
                  openMessages(
                    currentUser.id === selectedJob.customer_id
                      ? selectedJob.hiredQuote?.workerId
                      : currentUser.id,
                  )
                }
                onViewWorkerProfile={(workerId) => {
                  setSelectedWorkerId(workerId);
                  setActiveTab("worker_profile");
                }}
              />
            )}

            {/* 10 Worker Directory */}
            {activeTab === "worker_directory" && (
              <WorkerDirectoryPage
                workers={workers}
                onSelectWorker={(workerId) => {
                  setSelectedWorkerId(workerId);
                  setActiveTab("worker_profile");
                }}
                onOpenPostJob={() => {
                  setEditingJob(null);
                  setActiveTab("post_job");
                }}
              />
            )}

            {/* 11 Worker Profile */}
            {activeTab === "worker_profile" && (
              <WorkerProfilePage
                workers={workers}
                workerId={selectedWorkerId}
                onInviteToQuote={(worker) => startWorkerContact(worker, true)}
                onOpenMessages={(worker) => startWorkerContact(worker, false)}
              />
            )}

            {/* 12 Sign In & Create Account */}
            {activeTab === "auth" && (
              <AuthModalOrPage
                initialMode={recovery ? "recovery" : "signin"}
                onSuccess={(result) => {
                  setRecovery(false);
                  if (result?.role) setUserRole(result.role);
                  if (requestedTab === "auth" || recovery)
                    setActiveTab(
                      result?.role === "worker"
                        ? "worker_setup"
                        : "customer_dashboard",
                    );
                }}
                onCancel={() => setActiveTab("home")}
              />
            )}

            {/* 13 Worker Profile Setup */}
            {activeTab === "worker_setup" && (
              <WorkerProfileSetupPage
                key={currentUser.id}
                currentUser={currentUser}
                profile={workers.find((w) => w.id === currentUser.id)}
                onSave={async (profile) => {
                  if (await act("save_worker", profile)) {
                    setUserRole("worker");
                    setActiveTab("worker_dashboard");
                  }
                }}
              />
            )}

            {/* 14 Messages */}
            {activeTab === "messages" && (
              <MessagesPage
                conversations={conversations}
                initialConversationId={conversationId}
                onSend={(conversationId, text) =>
                  act("send_message", { conversationId, text })
                }
                onViewWorkerProfile={(workerId) => {
                  setSelectedWorkerId(workerId);
                  setActiveTab("worker_profile");
                }}
              />
            )}

            {/* 15 Account Settings & Help */}
            {activeTab === "settings_help" && (
              <AccountSettingsAndHelpPage
                currentUser={currentUser}
                onSave={(profile) => act("save_profile", profile)}
                onNavigateToWorkerSetup={() => setActiveTab("worker_setup")}
                onSignOut={async () => {
                  const { error } = await supabase.auth.signOut();
                  if (error) {
                    setError(error.message);
                    return;
                  }
                  setUserRole("customer");
                  setSelectedJob(null);
                  setConversationId(null);
                  setActiveTab("home");
                }}
              />
            )}
          </fieldset>
        )}
      </main>

      {/* Footer matching Wrench clean style */}
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <WrenchLogo />
            <p className="text-slate-500 leading-relaxed text-xs">
              Sri Lanka's everyday home jobs marketplace. Connect with reliable
              local plumbers, electricians, painters, and carpenters in your
              town.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              For Customers
            </h4>
            <ul className="space-y-2 font-medium text-slate-600">
              <li
                className="hover:text-[#008272] cursor-pointer"
                onClick={() => setActiveTab("post_job")}
              >
                Post a job
              </li>
              <li
                className="hover:text-[#008272] cursor-pointer"
                onClick={() => setActiveTab("worker_directory")}
              >
                Browse local workers
              </li>
              <li
                className="hover:text-[#008272] cursor-pointer"
                onClick={() => setActiveTab("settings_help")}
              >
                How WRENCH works
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              For Workers
            </h4>
            <ul className="space-y-2 font-medium text-slate-600">
              <li
                className="hover:text-[#008272] cursor-pointer"
                onClick={() => setActiveTab("find_work")}
              >
                Find work near you
              </li>
              <li
                className="hover:text-[#008272] cursor-pointer"
                onClick={() => setActiveTab("worker_setup")}
              >
                Become a worker
              </li>
              <li
                className="hover:text-[#008272] cursor-pointer"
                onClick={() => setActiveTab("worker_dashboard")}
              >
                Worker dashboard
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Popular Towns
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Kurunegala",
                "Colombo",
                "Kandy",
                "Gampaha",
                "Mawathagama",
                "Negombo",
              ].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedTown(t);
                    setActiveTab("find_work");
                  }}
                  className="bg-slate-50 hover:bg-teal-50 hover:text-[#008272] border border-slate-200 rounded-md px-2 py-1 text-[11px] font-semibold text-slate-700"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} WRENCH Sri Lanka. All rights reserved.
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="hover:text-slate-600 cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">
              Terms of Service
            </span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">
              Safety Guidelines
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation matching boards 16/18 */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        unreadCount={0}
      />
    </div>
  );
}
