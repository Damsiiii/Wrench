import React, { useState } from 'react';
import Navbar, { WrenchLogo } from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';

// Pages matching 15 Reference Boards
import HomePage from './components/HomePage';
import FindWorkPage from './components/FindWorkPage';
import JobDetailView from './components/JobDetailView';
import PostJobPage from './components/PostJobPage';
import SendQuotePage from './components/SendQuotePage';
import CompareQuotesPage from './components/CompareQuotesPage';
import CustomerDashboard from './components/CustomerDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import ManageHiredJobPage from './components/ManageHiredJobPage';
import WorkerDirectoryPage from './components/WorkerDirectoryPage';
import WorkerProfilePage from './components/WorkerProfilePage';
import AuthModalOrPage from './components/AuthModalOrPage';
import WorkerProfileSetupPage from './components/WorkerProfileSetupPage';
import MessagesPage from './components/MessagesPage';
import AccountSettingsAndHelpPage from './components/AccountSettingsAndHelpPage';

import { INITIAL_JOBS, INITIAL_WORKERS } from './data/mockData';

export default function App() {
  // Navigation & User State
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('customer'); // 'customer' | 'worker'
  const [currentUser, setCurrentUser] = useState({
    id: 'u-1',
    name: 'Kasun Perera',
    email: 'kasun.perera@gmail.com',
    role: 'customer',
    town: 'Kurunegala'
  });

  // Jobs State
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState(INITIAL_JOBS[0]);
  const [selectedWorkerId, setSelectedWorkerId] = useState('w-1');
  const [selectedTown, setSelectedTown] = useState('Kurunegala');

  // Job Handlers
  const handleCreateJob = (newJob) => {
    setJobs([newJob, ...jobs]);
    setSelectedJob(newJob);
    setActiveTab('customer_dashboard');
  };

  const handleSelectJob = (job) => {
    const fullJob = jobs.find((j) => j.id === job.id) || job;
    setSelectedJob(fullJob);
    setActiveTab('job_details');
  };

  const handleSubmitQuote = (jobId, newQuote) => {
    setJobs(
      jobs.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            quotes: [newQuote, ...(j.quotes || [])]
          };
        }
        return j;
      })
    );

    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob((prev) => ({
        ...prev,
        quotes: [newQuote, ...(prev.quotes || [])]
      }));
    }

    setActiveTab('worker_dashboard');
  };

  const handleChooseWorker = (jobId, quote) => {
    setJobs(
      jobs.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            status: 'in_progress',
            hiredQuote: quote
          };
        }
        return j;
      })
    );

    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob((prev) => ({
        ...prev,
        status: 'in_progress',
        hiredQuote: quote
      }));
    }

    setActiveTab('manage_hired_job');
  };

  const handleAddQuestion = (jobId, newQuestion) => {
    setJobs(
      jobs.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            questions: [...(j.questions || []), newQuestion]
          };
        }
        return j;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfc] text-slate-900 font-sans antialiased pb-16 md:pb-0">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenPostJob={() => setActiveTab('post_job')}
        onOpenSignIn={() => setActiveTab('auth')}
        currentUser={currentUser}
        jobCount={jobs.length}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {/* 01 Home */}
        {activeTab === 'home' && (
          <HomePage
            jobs={jobs}
            onNavigateToFindWork={() => setActiveTab('find_work')}
            onNavigateToPostJob={() => setActiveTab('post_job')}
            onSelectJob={handleSelectJob}
            onSelectTown={(town) => setSelectedTown(town)}
          />
        )}

        {/* 02 Find Work */}
        {activeTab === 'find_work' && (
          <FindWorkPage
            jobs={jobs}
            onSelectJob={handleSelectJob}
            selectedTown={selectedTown}
            setSelectedTown={setSelectedTown}
          />
        )}

        {/* 03 Job Details */}
        {activeTab === 'job_details' && (
          <JobDetailView
            job={selectedJob || jobs[0]}
            onBack={() => setActiveTab('find_work')}
            onOpenSendQuote={(job) => {
              setSelectedJob(job);
              setActiveTab('send_quote');
            }}
            onOpenMessages={() => setActiveTab('messages')}
            userRole={userRole}
            onAddQuestion={handleAddQuestion}
          />
        )}

        {/* 04 Post a Job */}
        {activeTab === 'post_job' && (
          <PostJobPage
            onSubmitJob={handleCreateJob}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {/* 05 Send a Quote */}
        {activeTab === 'send_quote' && (
          <SendQuotePage
            job={selectedJob || jobs[0]}
            currentUser={currentUser}
            onBack={() => setActiveTab('job_details')}
            onSubmitQuote={handleSubmitQuote}
          />
        )}

        {/* 06 Compare Quotes */}
        {activeTab === 'compare_quotes' && (
          <CompareQuotesPage
            job={selectedJob || jobs[0]}
            onChooseWorker={handleChooseWorker}
            onViewWorkerProfile={(workerId) => {
              setSelectedWorkerId(workerId);
              setActiveTab('worker_profile');
            }}
            onOpenMessages={() => setActiveTab('messages')}
            onEditJob={() => setActiveTab('post_job')}
          />
        )}

        {/* 07 Customer Dashboard */}
        {activeTab === 'customer_dashboard' && (
          <CustomerDashboard
            jobs={jobs}
            onSelectJob={handleSelectJob}
            onOpenPostJob={() => setActiveTab('post_job')}
            onCompareQuotes={(job) => {
              setSelectedJob(job);
              setActiveTab('compare_quotes');
            }}
            onManageHiredJob={(job) => {
              setSelectedJob(job);
              setActiveTab('manage_hired_job');
            }}
            onLeaveReview={(job) => {
              setSelectedJob(job);
              setActiveTab('manage_hired_job');
            }}
            onOpenHelp={() => setActiveTab('settings_help')}
          />
        )}

        {/* 08 Worker Dashboard */}
        {activeTab === 'worker_dashboard' && (
          <WorkerDashboard
            onNavigateToFindWork={() => setActiveTab('find_work')}
            onSelectJob={handleSelectJob}
            onManageHiredJob={(job) => {
              const fullJob = jobs.find((j) => j.id === job.id) || job;
              setSelectedJob(fullJob);
              setActiveTab('manage_hired_job');
            }}
          />
        )}

        {/* 09 Manage Hired Job & Review */}
        {activeTab === 'manage_hired_job' && (
          <ManageHiredJobPage
            job={selectedJob || jobs[0]}
            onBack={() =>
              setActiveTab(userRole === 'customer' ? 'customer_dashboard' : 'worker_dashboard')
            }
            onOpenMessages={() => setActiveTab('messages')}
            onViewWorkerProfile={(workerId) => {
              setSelectedWorkerId(workerId);
              setActiveTab('worker_profile');
            }}
          />
        )}

        {/* 10 Worker Directory */}
        {activeTab === 'worker_directory' && (
          <WorkerDirectoryPage
            onSelectWorker={(workerId) => {
              setSelectedWorkerId(workerId);
              setActiveTab('worker_profile');
            }}
            onOpenPostJob={() => setActiveTab('post_job')}
          />
        )}

        {/* 11 Worker Profile */}
        {activeTab === 'worker_profile' && (
          <WorkerProfilePage
            workerId={selectedWorkerId}
            onInviteToQuote={(worker) => setActiveTab('post_job')}
            onOpenMessages={() => setActiveTab('messages')}
          />
        )}

        {/* 12 Sign In & Create Account */}
        {activeTab === 'auth' && (
          <AuthModalOrPage
            initialMode="signin"
            onSuccess={(user) => {
              setCurrentUser(user);
              setUserRole(user.role);
              setActiveTab(user.role === 'customer' ? 'customer_dashboard' : 'worker_dashboard');
            }}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {/* 13 Worker Profile Setup */}
        {activeTab === 'worker_setup' && (
          <WorkerProfileSetupPage
            onSave={(profile) => {
              setUserRole('worker');
              setActiveTab('worker_dashboard');
            }}
          />
        )}

        {/* 14 Messages */}
        {activeTab === 'messages' && (
          <MessagesPage
            onViewWorkerProfile={(workerId) => {
              setSelectedWorkerId(workerId);
              setActiveTab('worker_profile');
            }}
          />
        )}

        {/* 15 Account Settings & Help */}
        {activeTab === 'settings_help' && (
          <AccountSettingsAndHelpPage
            currentUser={currentUser}
            onNavigateToWorkerSetup={() => setActiveTab('worker_setup')}
            onSignOut={() => {
              setUserRole('customer');
              setActiveTab('home');
            }}
          />
        )}
      </main>

      {/* Footer matching Wrench clean style */}
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <WrenchLogo />
            <p className="text-slate-500 leading-relaxed text-xs">
              Sri Lanka's everyday home jobs marketplace. Connect with reliable local plumbers,
              electricians, painters, and carpenters in your town.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              For Customers
            </h4>
            <ul className="space-y-2 font-medium text-slate-600">
              <li className="hover:text-[#008272] cursor-pointer" onClick={() => setActiveTab('post_job')}>
                Post a job
              </li>
              <li className="hover:text-[#008272] cursor-pointer" onClick={() => setActiveTab('worker_directory')}>
                Browse local workers
              </li>
              <li className="hover:text-[#008272] cursor-pointer" onClick={() => setActiveTab('settings_help')}>
                How WRENCH works
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              For Workers
            </h4>
            <ul className="space-y-2 font-medium text-slate-600">
              <li className="hover:text-[#008272] cursor-pointer" onClick={() => setActiveTab('find_work')}>
                Find work near you
              </li>
              <li className="hover:text-[#008272] cursor-pointer" onClick={() => setActiveTab('worker_setup')}>
                Become a verified worker
              </li>
              <li className="hover:text-[#008272] cursor-pointer" onClick={() => setActiveTab('worker_dashboard')}>
                Worker dashboard
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Popular Towns
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Kurunegala', 'Colombo', 'Kandy', 'Gampaha', 'Mawathagama', 'Negombo'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedTown(t);
                    setActiveTab('find_work');
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
          <div>© {new Date().getFullYear()} WRENCH Sri Lanka. All rights reserved.</div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation matching boards 16/18 */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        unreadCount={1}
      />
    </div>
  );
}
