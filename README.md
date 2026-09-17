# Alex Web Coder's PC Shop

A portfolio project: a fictional PC-hardware shop — components, prebuilt PCs, and a
compatibility-checking PC configurator — built end to end in Angular 22. No login, no real
backend, no real orders or payments. Fully bilingual (German/English).

**Live demo:** not deployed yet — static hosting (GitHub Pages or Cloudflare Pages) is a pending
decision, tracked in [`docs/mvp.md`](docs/mvp.md). Everything below runs locally.

## Screenshots

| Home | Catalog filters |
| --- | --- |
| ![Home page](docs/screenshots/home.png) | ![Catalog with filters applied](docs/screenshots/catalog-filters.png) |

| PC configurator | Order confirmation |
| --- | --- |
| ![PC configurator](docs/screenshots/configurator.png) | ![Checkout confirmation showing a configured PC](docs/screenshots/checkout-confirmation.png) |

## What this demonstrates

- A full Angular 22 app built from scratch: standalone components, signals for state, typed
  Reactive Forms, lazy-loaded routes, a functional `HttpInterceptor` standing in for a backend.
- A product catalog with category browsing, filtering, sorting, and URL-persisted state.
- A cart and multi-step guest checkout with a simulated order (fake order number, no real payment).
- A PC configurator that checks socket, RAM type, form factor, cooler clearance, GPU length, and
  PSU headroom against a small sample dataset — deliberately simplified and labeled as such.
- A demo profile with editable fields, order history, and a one-click reset of all local demo data.
- Full DE/EN support via a small custom translation service, not `@angular/localize` (see
  *Architecture* below for why).

## Getting started

This repo pins Node via `.nvmrc` (Angular 22's CLI needs Node 22.22.3+/24.15+/26+):

```bash
nvm use          # switches to the pinned Node version
npm install
npm start        # http://localhost:4200
```

```bash
npm run build    # production build, output in dist/
npm test         # unit tests (Vitest)
```

## Architecture

Full rationale lives in [`docs/mvp.md`](docs/mvp.md#architecture-notes); the short version:

- **Structure**: flat `src/app/{pages,components,models,services,guards,interceptors}/`,
  organized by type rather than by feature — a deliberate choice for a project this size over the
  more common feature-folder convention.
- **State**: Angular signals in plain services (`CartService`, `TranslationService`, …) — no
  external state library. `CartViewService` and `PcConfigurationStore` show the pattern for
  joining/deriving state without duplicating it.
- **Data access**: services call `HttpClient` against fake paths like `/api/products`, answered by
  [`mock-api.interceptor.ts`](src/app/interceptors/mock-api.interceptor.ts) with simulated latency
  and a documented, deterministic failure trigger (checkout with the email `fehler@beispiel.de`
  simulates a failed order — never a random failure). Because the request/response shape is
  already real, pointing this at an actual backend later means deleting the interceptor, not
  rewriting services or components.
- **i18n**: a custom signal-based `TranslationService` + flat dictionary
  ([`translations.data.ts`](src/app/services/translations.data.ts)), not `@angular/localize`.
  Localize's per-locale-build model can't switch language at runtime without a reload, which would
  drop the in-memory cart and any in-progress form — this app switches instantly, mid-checkout,
  without losing either (verified in the acceptance pass).
- **Money**: always stored as integer cents, formatted per-locale only at render time.

## The PC configurator

The riskiest part of the project, by design kept small and honest about its limits. Compatibility
checks ([`pc-compatibility.ts`](src/app/services/pc-compatibility.ts)) are pure, UI-independent
functions: CPU/mainboard socket, RAM/mainboard DDR generation, mainboard/case form factor,
cooler socket + height clearance, GPU length vs. case, and a simplified PSU headroom check
(CPU + GPU TDP plus a fixed reserve). Missing components are reported separately from incompatible
ones, so the UI can tell "pick something" apart from "these two don't work together."

The sample catalog is curated on purpose — [`mock-api.data.ts`](src/app/interceptors/mock-api.data.ts)
documents two fully valid 8-part builds and one reachable invalid case per rule, all covered by
[unit tests](src/app/services/pc-compatibility.spec.ts).

A finished, valid configuration is stored as a synthetic `Product`-shaped entry
(`PcConfigurationStore`) rather than changing the cart's `{productId, quantity}` shape to know
about "product or configuration" — the entire existing cart/checkout/order-history pipeline handles
it as a normal line item, with its full component breakdown carried through to order confirmation.

## Known limitations (by design, not oversights)

- **No real backend.** Auth, server-side validation, a real database, real payments (Stripe/Payone)
  are explicitly out of scope for this demo — see the backlog in `docs/mvp.md`.
- **Imprint and Privacy pages are placeholders.** German law expects real operator details on an
  Impressum; this project doesn't have real ones to publish yet, so those two pages show an
  explicit placeholder notice instead of inventing fake identity/address information. Terms has
  real (if simple) content since it needs no personal data.
- **The compatibility check is intentionally simplified** — it doesn't model every real-world PC
  building constraint (e.g. RAM speed vs. CPU memory controller limits, case radiator support).

## Testing

29 unit tests, written alongside the feature that introduced them:

| Area | File | Tests |
| --- | --- | --- |
| Cart (add/remove/clamp/clear, subtotal calc) | `cart.service.spec.ts` | 12 |
| Shipping rule (flat rate, free threshold) | `order.service.spec.ts` | 3 |
| Configurator compatibility rules + pricing | `pc-compatibility.spec.ts` | 12 |
| App smoke test | `app.component.spec.ts` | 2 |

**Deliberately not yet covered** (tracked, not forgotten): component/integration tests for catalog
filter behavior and checkout form validation/loading states, and service-level tests for the mock
interceptor's HTTP paths. Every one of those flows was verified by hand-driving the running app in
a real browser during development — see the acceptance section of `docs/mvp.md` — but that's
session verification, not a regression guard. Closing this gap is the next piece of work.

## How AI was used

Built iteratively with Claude Code against a written project plan (see `docs/`), one reviewed
commit per step rather than one large generation. Each step's compatibility rules, data model
choices, and architecture trade-offs (interceptor-based mocking, custom i18n, cart/configuration
integration) were deliberate design decisions made and understood while building — not just
accepted output — which is also why the trade-offs above are written down explicitly rather than
glossed over.

## Outlook

Beyond this MVP: a real Spring Boot + Docker backend, authentication, a backoffice, address
validation, indexed search with server-side autocomplete, product comparison, real test payments,
and closing the test-coverage gap noted above. Full backlog in `docs/mvp.md`.

## Demo script (~3 minutes)

1. **Home** → category carousel → click into **Grafikkarten**.
2. Apply a manufacturer filter, note the URL updates — reload the page, filter state survives.
3. Open a product's **detail page**, add it to the cart.
4. **Cart**: change quantity, see the subtotal recompute, proceed to checkout.
5. **Checkout**: click "Beispieldaten einsetzen", step through shipping/payment, place the order —
   note the clear "this is a simulation" notice and demo order number.
6. **PC-Konfigurator**: pick incompatible parts first (e.g. an Intel CPU with an AM5 board) to show
   the conflict message, then build a valid combination and add it to the cart.
7. Switch language (DE ⇄ EN) mid-flow to show it doesn't lose cart or form state.
