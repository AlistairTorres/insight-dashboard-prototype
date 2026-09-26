# Insight Dashboard Prototype

A compact URL inspection dashboard that turns an article link into a readable metadata snapshot.

## Highlights

- Validate HTTP and HTTPS URLs with the built-in URL API
- Extract the host and useful terms from the path
- Produce a small reading-time estimate from the available metadata
- Present results as structured metric cards
- Keep analysis local without fetching remote page content

## Technical approach

The project separates input validation, deterministic analysis and result rendering. Invalid input is reported through the interface, while valid results are rendered with DOM nodes rather than injecting untrusted markup.

## Run locally

Open index.html in a modern browser. No build step is required.

The dashboard is a focused exploration of information hierarchy, predictable client-side behaviour and readable output.
