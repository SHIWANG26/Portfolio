import Script from "next/script";
import type { Thing, WithContext } from "schema-dts";

interface JsonLdProps<T extends Thing> {
  schema: WithContext<T>;
  id: string;
}

export function JsonLd<T extends Thing>({ schema, id }: JsonLdProps<T>) {
  return (
    <Script
      id={`json-ld-${id}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
