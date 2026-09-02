import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DiscoverView } from './components/discover/DiscoverView';
import { SavedJobsView } from './components/saved/SavedJobsView';
import { AboutDemoView } from './components/about/AboutDemoView';
import { JobDetailDrawer } from './components/details/JobDetailDrawer';
import { Job } from './types/job';
import { registerAllWebMCPTools } from './webmcp/registry';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'saved') return 'saved';
      if (hash === 'about') return 'about';
    }
    return 'discover';
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Initialize WebMCP tools on mount with AbortController lifecycle handling
  useEffect(() => {
    const controller = new AbortController();

    const initWebMCP = async () => {
      try {
        const status = await registerAllWebMCPTools(controller.signal);
        if (status.isSupported) {
          console.log(`[WebMCP] Successfully registered ${status.toolCount} tools via ${status.target}`);
        } else {
          console.info('[WebMCP] Native browser modelContext not detected in current environment. Tools ready for agent invocation.');
        }
      } catch (err) {
        console.warn('[WebMCP] Registration note:', err);
      }
    };

    initWebMCP();

    return () => {
      controller.abort();
    };
  }, []);

  // Sync hash when tab changes
  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab === 'discover' ? '' : tab;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sticky Navigation Bar */}
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Tab Content */}
      <main className="flex-1">
        {currentTab === 'discover' && (
          <DiscoverView onSelectJob={setSelectedJob} />
        )}
        {currentTab === 'saved' && (
          <SavedJobsView
            onSelectJob={setSelectedJob}
            onNavigateDiscover={() => handleSelectTab('discover')}
          />
        )}
        {currentTab === 'about' && (
          <AboutDemoView />
        )}
      </main>

      {/* Job Details Slide-Over Drawer */}
      <JobDetailDrawer
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
