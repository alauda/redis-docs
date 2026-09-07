import { Layout as DoomLayout } from '@alauda/doom/theme';

import { TrademarkFooter } from './TrademarkFooter';

export * from '@alauda/doom/theme';

// The local binding deliberately shadows the `Layout` re-exported above, so
// that every page carries the trademark notice in its footer. An explicit
// export wins over a star re-export of the same name; this is the pattern
// doom itself uses in lib/theme.js.
export const Layout = () => (
  <>
    <DoomLayout />
    <TrademarkFooter />
  </>
);
