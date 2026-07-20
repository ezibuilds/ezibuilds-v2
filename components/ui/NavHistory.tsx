"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const INTERNAL_NAV_KEY = "ezb:internal-nav";

/**
 * Records whether the user has navigated within the site during this tab's
 * session.
 *
 * BackLink needs this to decide between router.back() and a plain link.
 * document.referrer cannot answer it: on a client-side navigation the referrer
 * still points at whatever loaded the first page, so arriving at a project
 * page from the work grid is indistinguishable from arriving from Google.
 */
export function NavHistory() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // A pathname change means the previous history entry belongs to this site,
    // so going back is guaranteed to stay in the app.
    sessionStorage.setItem(INTERNAL_NAV_KEY, "1");
  }, [pathname]);

  return null;
}
