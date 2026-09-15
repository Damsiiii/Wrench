import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import JobFeed from './components/JobFeed';
import JobDetailView from './components/JobDetailView';
import PostJobModal from './components/PostJobModal';
import PlaceBidModal from './components/PlaceBidModal';
import MarketPriceGuide from './components/MarketPriceGuide';

// New Pages
import MyJobsDashboard from './components/MyJobsDashboard';
import ContractorsDirectory from './components/ContractorsDirectory';
import HowItWorks from './components/HowItWorks';
import JoinAsProPage from './components/JoinAsProPage';

import { INITIAL_JOBS } from './data/mockData';
import { ShieldCheck, Scale, Zap, PhoneCall, HelpCircle } from 'lucide-react';

export default function App() {
  // User Mode & Navigation State
  const [userRole, setUserRole] = useState('homeowner'); // 'homeowner' | 'contractor'
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'my_jobs' | 'directory' | 'how_it_works' | 'join_pro'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Job Data
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  // Modals
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);
  const [bidTargetJob, setBidTargetJob] = useState(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isMarketGuideOpen, setIsMarketGuideOpen] = useState(false);

  // Handlers
  const handleCreateJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
    setActiveTab('my_jobs');
  };

  const handleSubmitBid = (jobId, newBid) => {
    setJobs((prevJobs) =>
      prevJobs.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            bids: [newBid, ...j.bids]
          };
        }
        return j;
      })
    );

    if (selectedJobDetail && selectedJobDetail.id === jobId) {
      setSelectedJobDetail((prev) => ({
        ...prev,
        bids: [newBid, ...prev.bids]
      }));
    }
  };

  const handleAcceptBid = (jobId, bidId) => {
    setJobs((prevJobs) =>
      prevJobs.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            status: 'in_progress',
            bids: j.bids.map((b) => (b.id === bidId ? { ...b, status: 'accepted' } : b))
          };
        }
        return j;
      })
    );

    if (selectedJobDetail && selectedJobDetail.id === jobId) {
      setSelectedJobDetail((prev) => ({
        ...prev,
        status: 'in_progress',
        bids: prev.bids.map((b) => (b.id === bidId ? { ...b, status: 'accepted' } : b))
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">

      {/* Top Header */}
      <Navbar
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenPostJob={() => setIsPostJobOpen(true)}
        onOpenMarketGuide={() => setIsMarketGuideOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        jobCount={jobs.length}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'feed' && (
          <>
            <HeroSection
              onOpenPostJob={() => setIsPostJobOpen(true)}
              onOpenMarketGuide={() => setIsMarketGuideOpen(true)}
            />
            <JobFeed
              jobs={jobs}
              userRole={userRole}
              onSelectJob={(job) => setSelectedJobDetail(job)}
              onOpenPlaceBidModal={(job) => setBidTargetJob(job)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </>
        )}

        {activeTab === 'my_jobs' && (
          <MyJobsDashboard
            jobs={jobs}
            onSelectJob={(job) => setSelectedJobDetail(job)}
            onNavigateToExplore={() => setActiveTab('feed')}
          />
        )}

        {activeTab === 'directory' && (
          <ContractorsDirectory
            onOpenPostJob={() => setIsPostJobOpen(true)}
          />
        )}

        {activeTab === 'how_it_works' && (
          <HowItWorks
            onOpenPostJob={() => setIsPostJobOpen(true)}
            onOpenMarketGuide={() => setIsMarketGuideOpen(true)}
          />
        )}

        {activeTab === 'join_pro' && (
          <JoinAsProPage
            onNavigateToFeed={() => setActiveTab('feed')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-lg font-mono">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>WRENCH</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The reverse-bidding marketplace for home micro-services. Homeowners post tasks; verified contractors submit itemized bids benchmarked against real-time local averages.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Marketplace Views</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('feed')}>Live Job Bidding Feed</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('my_jobs')}>My Jobs Dashboard</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('directory')}>Verified Contractors Directory</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab('how_it_works')}>How Reverse-Bidding Works</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Price Reasonableness Engine</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer" onClick={() => setIsMarketGuideOpen(true)}>National Electrical Code (NEC) Benchmarks</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsMarketGuideOpen(true)}>Plumbing Labor & Equipment Standards</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsMarketGuideOpen(true)}>Material & Callout Fee Itemization</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setIsMarketGuideOpen(true)}>Contractor Licensing Guarantee</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Fair Bid Guarantee</h4>
            <p className="text-slate-400 leading-relaxed">
              Got a questionable quote from an offline contractor? Post it on Wrench to receive itemized competitive bids.
            </p>
            <button
              onClick={() => setIsPostJobOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <Scale className="w-4 h-4 text-amber-300" />
              <span>Post Job For Bids</span>
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px]">
          © {new Date().getFullYear()} Wrench Reverse-Bidding Marketplace Inc. All rights reserved.
        </div>
      </footer>

      {/* Modals */}
      {selectedJobDetail && (
        <JobDetailView
          job={selectedJobDetail}
          onClose={() => setSelectedJobDetail(null)}
          onOpenPlaceBidModal={(job) => {
            setSelectedJobDetail(null);
            setBidTargetJob(job);
          }}
          onAcceptBid={handleAcceptBid}
          userRole={userRole}
        />
      )}

      {isPostJobOpen && (
        <PostJobModal
          isOpen={isPostJobOpen}
          onClose={() => setIsPostJobOpen(false)}
          onSubmitJob={handleCreateJob}
        />
      )}

      {bidTargetJob && (
        <PlaceBidModal
          isOpen={!!bidTargetJob}
          job={bidTargetJob}
          onClose={() => setBidTargetJob(null)}
          onSubmitBid={handleSubmitBid}
        />
      )}

      {isMarketGuideOpen && (
        <MarketPriceGuide
          isOpen={isMarketGuideOpen}
          onClose={() => setIsMarketGuideOpen(false)}
        />
      )}

    </div>
  );
}
