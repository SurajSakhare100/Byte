# Article image assets

Store images beside their article topic:

```text
public/assets/articles/
├── react/
├── nextjs/
├── javascript/
└── ai/
```

Use paths such as `/assets/articles/react/hooks-cover.webp` in an article's `coverImage` frontmatter. Keep cover images wide (around 1600 × 900), compressed as WebP or AVIF, and include meaningful alt text when rendering images inside MDX.
