# Folded Scrap brand refresh

The editable [SVG](../../public/favicon.svg) uses the heavier hand-cut N, a folded corner, a torn lower edge, and an offset shadow. The butter face gives the N 9.42:1 contrast, compared with 6.92:1 on sky and 6.03:1 on lilac. Its silhouette remains visible at 16 px on both tab backgrounds.

## Favicon and app icons

- [Before and after on actual Edge tabs](native-edge-tabs-before-after.png) in light and dark. Playwright drove system Edge and the captures show the left part of each native tab.
- [Before and after at 16 px](favicon-tabs-before-after.png) on simulated light and dark browser tabs. Playwright captures the tab mockup in the page viewport.
- [Sky, butter, and lilac at 16 px](favicon-colour-comparison.png) on the same simulated tabs.
- [Light renders](icon-renders-light.png) and [dark renders](icon-renders-dark.png) show the 16, 32, 180, and 512 px icons at their native sizes. The 512 px mark and shadow fit within a 193.0 px radius inside the 204.8 px maskable safe zone.

## Site screenshots

System Edge at 1x device scale, after hydration and font load, with reduced motion. The nav and mobile footer screenshots are cropped to isolate each surface.

| Viewport and theme | Nav before | Nav after | Footer before | Footer after |
| --- | --- | --- | --- | --- |
| 1280 px light | [Before](before-nav-1280-light.png) | [After](after-nav-1280-light.png) | [Before](before-footer-1280-light.png) | [After](after-footer-1280-light.png) |
| 1280 px dark | [Before](before-nav-1280-dark.png) | [After](after-nav-1280-dark.png) | [Before](before-footer-1280-dark.png) | [After](after-footer-1280-dark.png) |
| 375 px light | [Before](before-nav-375-light.png) | [After](after-nav-375-light.png) | [Before](before-footer-375-light.png) | [After](after-footer-375-light.png) |
| 375 px dark | [Before](before-nav-375-dark.png) | [After](after-nav-375-dark.png) | [Before](before-footer-375-dark.png) | [After](after-footer-375-dark.png) |

The header measured 72 px before and after at both widths and stayed the same height during scroll and theme changes. The 320 px checks measured the full document and nav in both themes.

## Social cards

These PNGs came from the local URLs in each page's `og:image` metadata. Each endpoint returned a 1200 by 630 image with identical bytes across light and dark browser contexts.

| Card | Before | After |
| --- | --- | --- |
| Homepage | [Before](before-og-root.png) | [After](after-og-root.png) |
| Article | [Before](before-og-article.png) | [After](after-og-article.png) |
