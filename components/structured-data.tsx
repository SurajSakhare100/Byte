import { organizationJsonLd, websiteJsonLd } from '@/lib/structured-data';

export function StructuredData() {
  const schemas = [websiteJsonLd(), organizationJsonLd()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
