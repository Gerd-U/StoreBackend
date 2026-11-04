# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The author, building a learning / portfolio project that pairs a React + Vite frontend with a .NET `StoreBackend` API. Secondary audience: anyone the author shows it to (reviewers, recruiters, peers), who should find it credible and memorable.

## Product Purpose

A catalog workspace for an electronics / gadgets store: browse, add and remove products, and register, view and remove users. Success is a frontend that feels designed and specific to its subject rather than a template, while staying truthful to what the API does.

## Capabilities and Constraints

- API (`/api/products`): list, get by id, create, delete. A product has only `name` (max 50 chars) and `productResourceId` (GUID). No price, stock, category, image, or description exists.
- API (`/api/users`): list, get by id, create, delete. A user has `name` (2–100 chars), `email` (max 150, unique, stored lowercase) and `userResourceId` (GUID). No passwords or roles exist; there is no authentication.
- Frontend routes: `/`, `/products`, `/products/new`, `/products/:id`, `/users`, `/users/new`, `/users/:id`, `*` (404).
- Data comes from the .NET API (SQL Server `StoreDb`).
- Stack: React 19, TypeScript, Vite, Tailwind CSS v4, react-router-dom v7, lucide-react.

## Brand Commitments

None. Name, tone, and copy are open to change. Interface language: Spanish (existing copy is Spanish; kept unless the user says otherwise).

## Evidence on Hand

Four sample products (Wireless Headphones, Smart Watch, Mechanical Keyboard, 4K Monitor). No real customers, sales figures, prices, or imagery exist; never present invented commercial data as real.

## Product Principles

- Truth over decoration: show only fields the API actually has.
- Specific to electronics, not to "a store".
- A portfolio piece: craft is the point, but every screen must still work.
