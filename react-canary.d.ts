// App Router runs on a React canary build, which is where <ViewTransition>
// lives. The runtime export is present in Next's bundled React, but the
// stable @types/react entry point does not declare it, so opt into the
// canary declarations here.
/// <reference types="react/canary" />
