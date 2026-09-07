import { Layout as DoomLayout } from '@alauda/doom/theme';

import { TrademarkFooter } from './TrademarkFooter';

export * from '@alauda/doom/theme';

// The local binding deliberately shadows the `Layout` re-exported above, so
// that every page carries the trademark notice in its footer.
// eslint-disable-next-line import-x/export
export const Layout = () => (
  <>
    <DoomLayout />
    <TrademarkFooter />
  </>
);
