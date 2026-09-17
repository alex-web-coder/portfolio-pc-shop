# MVP Scope — Angular PC Shop

Portfolio demo of a PC component / prebuilt-PC / custom-configuration shop. No login, no real
orders or payments, DE/EN. Angular 22 + Angular Material. This document is the binding definition
of "done" for the MVP — each item below is either in scope with a checkable acceptance criterion,
or explicitly deferred to the backlog at the bottom.

Status legend: ✅ done · ⏳ in progress · ⬜ not started.

## Scope by area

### Home & layout — ✅ done (Milestone 1, wired to real routes in step 8)
Header, footer, persistent demo banner, hero, manual keyboard-navigable category and product
carousels backed by fake-data services. Nav labels and cart/account icons link to real routes.
**Done when:** header/footer/demo-banner render on every page, carousels are mouse- and
keyboard-operable, layout holds up from mobile to desktop.

### Scaffolding & ops — ✅ done (step 2), deploy still pending host choice
404 page, route stubs replaced by real pages as each feature landed, CI running build + tests on
every push. Static hosting choice (GitHub Pages vs. Cloudflare Pages) is still open — first deploy
happens once that's picked; not required for MVP acceptance itself.
**Done when:** every nav/footer link resolves to a real page, CI is green on push.

### Product catalog — ✅ done (step 4)
33 sample products across 8 categories incl. 3 prebuilt PCs, category listing pages, product
detail pages (image, description, specs, price, availability), filters (price/manufacturer/one
category-specific spec attribute), sorting (price/name), filter+sort state in URL query params.
**Done when:** a visitor can go from a category to a product, filter/sort, and a filtered URL
shows the same state after reload or when opened in a new tab.

### Cart & checkout — ✅ done (steps 5–6)
Add/remove/change quantity, centrally computed cent-based totals, localStorage persistence
robust to missing/corrupted data or deleted products. Multi-step guest checkout (contact/address
→ shipping & payment simulation → review → confirmation with a fake order number), "fill sample
data" button, no real payment data collected. Order stores a snapshot of items/prices (incl. specs,
so a configured PC's component breakdown survives to confirmation) so later cart changes don't
retroactively change a placed order.
**Done when:** the full product → cart → demo-order flow works online, invalid forms block
progression, an empty cart can't check out, double-submit doesn't create duplicate orders. ✅
verified: guard blocks empty-cart checkout, rapid double-click on submit produces exactly one order.

### PC configurator — ✅ done (step 7)
CPU/mainboard socket match, RAM/mainboard DDR type, mainboard/case form factor, cooler
socket+clearance, GPU length vs. case, simplified PSU headroom check — against a small documented
sample dataset, explicitly labeled as a simplified check. Invalid selections stay visible with
understandable conflict messages; only a fully valid configuration can go into the cart, as one
cart line with a stable snapshot of its components (stored as a synthetic Product entry rather than
changing CartItem's shape).
**Done when:** at least two valid configurations exist in the sample data, and each rule has at
least one reachable, understandable invalid case. ✅ both documented in mock-api.data.ts and
covered by unit tests.

### Profile & info — ✅ done (step 8)
No-login demo profile (editable, Reactive Forms) with order history from the order service; FAQ,
About, shipping/payment info pages; a "reset demo data" action clearing cart/history/configs/profile
in place. Fictional shop content stays clearly separate from real author/portfolio attribution.
**Known gap, not a defect:** Imprint and Privacy pages show an explicit placeholder notice rather
than invented real operator details (name/address) — flagged for the user to fill in before any
real publication, per the plan's explicit instruction not to fabricate that information.
**Done when:** every announced page has real content, internal links work, no dead placeholder
actions remain.

### Language & responsive — ✅ done (steps 3, 9)
DE default, EN complete for all MVP pages including validation/error/empty states and order
confirmations. Language switch preserves cart and in-progress form input (verified directly: no
reload occurs on switch). Prices/dates formatted per locale; currency stays EUR and delivery area
doesn't change with language. Mobile checked via a full route sweep (desktop + 390px) — found and
fixed a missing global `box-sizing: border-box` reset that was causing horizontal overflow on the
configurator and catalog filter panel.
**Done when:** the full purchase and configurator flow works end to end in both languages and on
small screens.

### Tests & acceptance — ✅ done (step 10)
Unit tests for cart totals/quantities (12), the shipping rule (3), and configurator compatibility
rules (12) were written alongside the feature that introduced them, per plan. The previously
deferred component/integration coverage has since been closed: catalog filtering via
`RouterTestingHarness` against the real interceptor (5), checkout form validation/back-navigation/
happy-path/simulated-error/double-submit-guard driven through the rendered DOM (5), and
service-level tests for the mock interceptor's HTTP paths incl. the simulated order failure (7).
46 tests total.
**Acceptance checklist:**
- ✅ All agreed features work online, no login required.
- ✅ German and English are complete.
- ✅ No real orders or payments are ever created.
- ✅ Direct page loads and reloads work on every route.
- ✅ Main flows work on mobile and with keyboard only.
- ✅ Build and relevant tests pass.
- ✅ No known bug blocks a main flow.

### Portfolio packaging — ⬜ not started (step 11)
README with live link, screenshots, goal/feature summary, run/test instructions, architecture and
mock-service explanation, demo limitations, a note on how AI was used, and a separate outlook.
Rehearsed 3-minute demo: category → filter → product detail → cart → demo order → configurator.

## Sample data rules
~25–35 consistent products including 2–3 prebuilt PCs. Consistent specs and at least two fully
buildable, compatible PC configurations matter more than product count.

## Out of scope for the MVP (backlog, after MVP acceptance)
Real backend, authentication, server-side validation, address autocomplete, indexed/server-side
search, SSO, product comparison, captcha, real test payments (Stripe/Payone), dark/light mode
toggle.

## Architecture notes

**Frontend-first.** The whole MVP is a static frontend against mocked data; no backend exists
until after MVP acceptance. This keeps scope bounded and demoable, at the cost of features that
genuinely need a server (real auth, server-side validation) being deferred rather than faked badly.

**State management.** Local component/service state via Angular signals; no external state
library (NgRx etc.) — the app is small enough that a signal-based `CartService` and similar
services are sufficient, and adding a state library now would be premature.

**Data access.** Services call `HttpClient` against fake endpoint paths (e.g. `/api/products`),
intercepted by an `HttpInterceptor` that returns canned responses with simulated latency and
occasional deterministic errors (never random ones in normal demo use). This is a deliberate
upgrade over "just return `of(array)` from the service": the request/response shape is already
real, so swapping to a real backend later means deleting the interceptor, not rewriting every
service or component.

**Folder structure.** Flat `src/app/{pages,components,models,services}/`, organized by type
rather than by feature area — a deliberate deviation from the Projektplan's `features/<name>/`
convention, chosen for a project this size to keep navigation simple. Revisit only if the flat
structure starts causing naming collisions or unclear ownership as the app grows.

**Money & i18n.** Prices are always stored as integer cents, formatted for display per locale.
Standalone components, typed Reactive Forms for checkout/profile, lazy-loaded routes for larger
areas. Code (files, identifiers, routes) is English; all user-visible text is bilingual via a
custom signal-based `TranslationService` (not `@angular/localize` — that can't switch language at
runtime without a reload, which would drop in-memory cart/form state).

**Tooling.** Angular 22.1 + Angular Material 22.1 (used sparingly — icons/icon-buttons only, rest
is custom SCSS on top of design tokens in `src/styles/_tokens.scss`). Node pinned to 26.7.0 via
`.nvmrc` (Angular 22's CLI requires 22.22.3+/24.15+/26+; run `nvm use` before `npm start`/`build`).
Static hosting only (GitHub Pages or Cloudflare Pages, choice pending), no backend for now.
