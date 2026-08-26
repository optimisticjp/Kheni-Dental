import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

type FaqProps = {
  id?: string;
  title?: string;
  description?: string;
  items: AccordionItem[];
};

/**
 * FAQ section shell. Server Component wrapping the native `<details>`-based
 * `Accordion` (zero JS). Constrained width keeps line length readable.
 */
export function Faq({
  id,
  title = "Frequently asked questions",
  description,
  items,
}: FaqProps) {
  return (
    <Section id={id}>
      <Container width="4xl">
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" size="h2">
            {title}
          </Heading>
          {description ? (
            <p className="mt-4 text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}
