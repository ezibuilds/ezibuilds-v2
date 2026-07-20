import { ViewTransition } from "react";

/**
 * Directional page slide, driven by the `transitionTypes` a <Link> carries.
 *
 * `default: "none"` on both sides matters: without it every ViewTransition on
 * the page would animate during unrelated transitions, so the shared-element
 * morph would fight this slide. It also keeps first loads and browser-driven
 * back/forward navigations still, since those carry no transition type.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
