// client/src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Extracts pathname and hash properties from location object
  const { pathname, hash } = useLocation();

  // Automatically scrolls to top whenever pathname changes,
  // but NOT if there's a hash link on the page.
  useEffect(() => {
    // If there is a hash, the browser will handle scrolling to the element.
    // If there is no hash, we scroll to the top of the page.
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, hash]); // Effect now also depends on the hash

  return null; // This component does not render anything
};

export default ScrollToTop;
