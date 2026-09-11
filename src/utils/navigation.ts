/**
 * Unified navigation utility for the single-page application.
 * Handles route changes, scroll position management, and hash anchors across pages.
 */
export function navigateTo(targetPathOrHash: string) {
  if (typeof window === 'undefined') return;

  // 1. Handle in-page hash links (e.g. #capabilities, #case-study)
  if (targetPathOrHash.startsWith('#')) {
    const hash = targetPathOrHash;
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

    // If currently on a subpage (e.g. /custom-software-development), route back to home first
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/' + hash);
      window.dispatchEvent(new Event('app-navigate'));
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // After home page renders, smoothly scroll down to the targeted section
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
      return;
    }

    // If already on the home page, scroll directly to element
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  // 2. Handle page route links (e.g. '/', '/custom-software-development', '/mobile-app-development-company')
  const cleanTarget = targetPathOrHash.replace(/\/$/, '') || '/';
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  if (currentPath === cleanTarget) {
    // If user clicks link to the current active page, smoothly scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Navigating to a different page: update history, notify app, and reset scroll to top immediately
    window.history.pushState({}, '', cleanTarget);
    window.dispatchEvent(new Event('app-navigate'));
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
}
