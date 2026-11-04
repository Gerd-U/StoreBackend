---
version: 1
slug: "src-features-products-pages-productspage-tsx"
primary_target: "src/features/products/pages/ProductsPage.tsx"
related_targets: ["src/shared/pages/HomePage.tsx","src/shared/components/NotFound.tsx"]
---

# Catalog workspace (/, /products, 404)

Mode: operate. Audience: the author and people they show the project to. Job: browse, find, and add/remove products (name + resource ID only).

## Direction contract

THESIS: The catalog as an Akihabara electronics street: stacked vertical shop signs for navigation and hand-cut POP cards for products. Refuses the grey sidebar + white card + blue button admin.

OWN-WORLD: Sign yellow #FFE01B, ink #111, signal red #E8262B, blue #1E6BFF on white paper. Dela Gothic One for product names and screen titles only; Zen Kaku Gothic New for all UI, labels, data. Controls are full-round pills with 2px ink outlines; cards are square, 3px ink-outlined cut card stock with a colored header band. No shadows at rest, no mono, no eyebrows.

STORY: The visitor sees a whole shelf of products at once, scans names shouted like shop POP, filters by typing, flips Vitrina/Lista, and adds a product from the one red action.

FIRST VIEWPORT: Black rail left (240px) with stacked colored sign tiles as nav; yellow title band "Productos" in Dela Gothic at ~72px with count and the red "Nuevo producto" pill at right; search + Vitrina/Lista segmented toggle row; then 4-up POP card grid filling the rest.

FORM: Akihabara POP, candidate 5 of 7 grounded list. seed:b8c0f3bd5bd6fc1c. Signature move: POP cards hang slightly tilted in Vitrina and snap straight on hover/focus; the toggle remaps the whole shelf into a dense list at once.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
