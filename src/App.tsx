/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-aura-bg p-6 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-serif text-aura-dark mb-4">Something went wrong</h2>
        <pre className="text-xs text-aura-dark/40 bg-aura-dark/5 p-4 rounded overflow-auto mb-6 max-h-[200px]">
          {error instanceof Error ? error.message : "An unexpected error occurred"}
        </pre>
        <button 
          onClick={() => {
            resetErrorBoundary();
            window.location.reload();
          }}
          className="px-6 py-2 border border-aura-dark text-xs uppercase tracking-widest hover:bg-aura-dark hover:text-aura-bg transition-colors"
        >
          Reload Studio
        </button>
      </div>
    </div>
  );
}

// Lazy load 3D components for performance
const ThreeHero = lazy(() => import("./components/ThreeHero"));
const Philosophy = lazy(() => import("./components/Philosophy"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const MoodInterpreter = lazy(() => import("./components/MoodInterpreter"));
const Process = lazy(() => import("./components/Process"));
const Enquiry = lazy(() => import("./components/Enquiry"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SmoothScroll>
        <LoadingScreen />
        <CustomCursor />
        
        <main className="relative">
          <Suspense fallback={<div className="h-screen bg-aura-bg" />}>
            <ThreeHero />
          </Suspense>

          <Suspense fallback={null}>
            <Philosophy />
          </Suspense>

          <Suspense fallback={null}>
            <Portfolio />
          </Suspense>

          <Suspense fallback={null}>
            <MoodInterpreter />
          </Suspense>

          <Suspense fallback={null}>
            <Process />
          </Suspense>

          <Suspense fallback={null}>
            <Enquiry />
          </Suspense>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </main>
      </SmoothScroll>
    </ErrorBoundary>
  );
}

