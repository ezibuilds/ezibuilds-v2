"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { INTERNAL_NAV_KEY } from "@/components/ui/NavHistory";

const LABEL = "Back";

// The flag is written before this page mounts and never changes while it is
// open, so there is nothing to subscribe to.
const subscribe = () => () => {};
const getSnapshot = () => sessionStorage.getItem(INTERNAL_NAV_KEY) === "1";

function Glyph() {
  return (
    <span
      aria-hidden
      className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
    >
      &larr;
    </span>
  );
}

const CLASSES =
  "group -ml-1 inline-flex min-h-[44px] items-center gap-2 rounded-full pr-3 pl-1 text-[11px] uppercase tracking-[0.22em] opacity-85 transition-opacity hover:opacity-100 sm:min-h-0 sm:py-1";

/**
 * Returns the user to wherever they came from.
 *
 * Renders as a real <Link> to the work grid until the client confirms there is
 * in-app history to pop. That ordering matters: the server has no way to know
 * the navigation history, so a button rendered up front would be inert for
 * anyone who lands here directly, from a shared link or a search result.
 */
export function BackLink({ fallbackHref = "/#work" }: { fallbackHref?: string }) {
  const router = useRouter();

  // sessionStorage is external state, so read it through useSyncExternalStore
  // rather than syncing it into useState from an effect. The server snapshot
  // is false, which is what makes the link the server-rendered default.
  const canPop = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (!canPop) {
    return (
      <Link
        href={fallbackHref}
        transitionTypes={["nav-back"]}
        data-cursor="hover"
        className={CLASSES}
      >
        <Glyph />
        {LABEL}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      data-cursor="hover"
      className={CLASSES}
    >
      <Glyph />
      {LABEL}
    </button>
  );
}
