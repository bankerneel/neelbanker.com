# Roadmap

## File Role

- `ROADMAP.md` tracks prioritized forward work.
- `STATES.md` tracks what is currently true now.
- `MEMORY.md` tracks durable decisions and learned preferences.

## Now

### 1. Browser QA and fix pass

- Verify homepage hero on:
  - mobile
  - small laptop
  - ultrawide desktop
- Verify the recent mobile-specific code pass in a real browser:
  - hero signal band
  - project filters
  - writing filters
  - Cal booking embed
- Verify form flows:
  - newsletter subscribe
  - contact form
  - resource download
- Verify nav/footer behavior on edge widths and sticky scroll behavior

### 2. Motion/performance tuning

- Profile `components/hero-client.tsx` in browser DevTools
- Reduce expensive blur/glow layers only if profiling shows real cost
- Tune animation density by viewport size if needed
- Check hero hover behavior on real devices before adding more visual chrome

## Next

### 3. Homepage proof refinement

- Add or refine one stronger trust/proof strip near the fold
- Sharpen recruiter/employer proof messaging
- Reassess section ordering based on what should convert best

### 4. `/projects` depth upgrade

- Add stronger role/stack/outcome summaries per featured project
- Improve spotlight/category transitions if needed
- Consider richer featured-by-category interaction

### 5. Writing system polish

- Improve MDX treatment for:
  - tables
  - callouts
  - code blocks
- Add stronger related-reading behavior at article end
- Consider subtle reading progress indicator

## Later

### 6. Content expansion

- Add more curated case studies if the user wants broader proof-of-work coverage
- Add more writing from `profile-data/WEBSITE.md` backlog
- Potentially add a real resume PDF if the user supplies one

### 7. QA / testing hardening

- Add targeted Playwright coverage for:
  - key routes
  - nav flow
  - form submission UX
  - resource download flow

## Ongoing Rules

- Preserve NDA-safe project naming in user-facing content
- Keep the homepage hero text treatment intact unless explicitly requested otherwise
- Favor complete section/page passes over piecemeal visual tweaks
