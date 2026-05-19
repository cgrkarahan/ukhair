# Sanity Seed Content

The live site keeps layout and components in Next.js. Sanity edits the current launch copy, SEO fields, FAQs, treatment content, proof placeholders, reviews, and site settings.

Generate the editable launch content from the current frontend source:

```bash
node sanity/seed/build-current-content.mjs
```

Import it into the configured Sanity dataset when you are ready to seed Studio:

```bash
npx sanity dataset import sanity/seed/current-content.ndjson production --replace
```

The old `homepage.ndjson` file is legacy content and should not be imported for the relaunch. It uses the previous positioning and does not match the live frontend model.
