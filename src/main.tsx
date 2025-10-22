import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Projects from "./Projects.tsx";
import Skills from "./Skills.tsx";
import Future from "./Future.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import PageTransition from "./components/PageTransition.tsx";
import LoadingScreen from "./components/LoadingScreen.tsx";

let isFirstLoad = true;

function AnimatedOutlet() {
  const location = useLocation();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isFirstLoad) {
      isFirstLoad = false;
      setShouldAnimate(false);
    } else {
      setShouldAnimate(true);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {shouldAnimate ? (
        <Outlet key={location.pathname} />
      ) : (
        <div key={location.pathname}>{<Outlet />}</div>
      )}
    </AnimatePresence>
  );
}

function RootApp() {
  return (
    <>
      <LoadingScreen />
      <RouterProvider router={router} />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <AnimatedOutlet />,
      children: [
        {
          path: "/",
          element: (
            <PageTransition>
              <App />
            </PageTransition>
          ),
        },
        {
          path: "/projects",
          element: (
            <PageTransition>
              <Projects />
            </PageTransition>
          ),
        },
        {
          path: "/skills",
          element: (
            <PageTransition>
              <Skills />
            </PageTransition>
          ),
        },
        {
          path: "/future",
          element: (
            <PageTransition>
              <Future />
            </PageTransition>
          ),
        },
      ],
    },
  ],
  {
    basename: "/my-portfolio",
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);

let currentLenis: Lenis | null = null;

function initLenis() {
  const scrollElement = document.querySelector("#scrollsection");
  if (scrollElement && !currentLenis) {
    currentLenis = new Lenis({
      wrapper: scrollElement as HTMLElement,
      content: scrollElement as HTMLElement,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let wheelTimeout: number;
    scrollElement.addEventListener("wheel", () => {
      clearTimeout(wheelTimeout);
      wheelTimeout = window.setTimeout(() => {
        const sections = scrollElement.querySelectorAll("section");
        const scrollTop = scrollElement.scrollTop;

        let closestSection = 0;
        let minDistance = Infinity;

        sections.forEach((section, index) => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const distance = Math.abs(scrollTop - sectionTop);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = index;
          }
        });

        const targetSection = sections[closestSection] as HTMLElement;
        currentLenis?.scrollTo(targetSection.offsetTop, { duration: 0.8 });
      }, 150);
    });

    function raf(time: number) {
      currentLenis?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  } else if (!scrollElement && currentLenis) {
    currentLenis.destroy();
    currentLenis = null;
  }
}

setTimeout(initLenis, 100);

const observer = new MutationObserver(() => {
  initLenis();
});

observer.observe(document.body, { childList: true, subtree: true });
