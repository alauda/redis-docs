import { usePageData } from '@rspress/core/runtime';

import './trademark-footer.css';

/**
 * The Redis Ltd. trademark statement, rendered as a site footer.
 *
 * The compliance guide requires the statement on the user documentation, and
 * accepts it being written once in the footer. It has to be reproduced whole,
 * so both paragraphs are kept verbatim -- do not reword, abbreviate, or drop
 * the registered-trademark sign.
 *
 * The same two paragraphs also appear in `docs/en/intro.mdx` and in the
 * `llmstxt-config.yaml` body; keep the three copies identical.
 */
export const TrademarkFooter = () => {
  const { page } = usePageData();
  // Doc pages reserve the left gutter for the fixed sidebar; other page types
  // (home, 404) span the full width.
  const inset = page.pageType === 'doc' ? ' doom-trademark-footer--inset' : '';
  return (
    <footer className={`doom-trademark-footer${inset}`}>
      <p>
        Redis® is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis
        Ltd. Any use by Alauda is for referential purposes only and does not indicate any
        sponsorship, endorsement or affiliation between Redis Ltd. and Alauda.
      </p>
      <p>
        Alauda is an independent vendor. This product is not affiliated with, endorsed by, or
        sponsored by Redis Ltd. All trademarks are the property of their respective owners and are
        used here for identification purposes only.
      </p>
    </footer>
  );
};
