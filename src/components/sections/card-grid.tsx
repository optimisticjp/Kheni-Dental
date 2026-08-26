import { type LucideIcon } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export type CardGridItem = {
  title: string;
  description: string;
  /** Optional lucide icon component. */
  icon?: LucideIcon;
};

type CardGridProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: CardGridItem[];
  /** Column count at the largest breakpoint. Defaults to 3. */
  columns?: 2 | 3 | 4;
};

const columnClasses: Record<NonNullable<CardGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Generic responsive card grid — the reusable shell behind the homepage
 * feature grid. Server Component. Cards use CSS-only hover states; the grid
 * collapses to one column on small screens for clean 360px behavior.
 */
export function CardGrid({
  id,
  eyebrow,
  title,
  description,
  items,
  columns = 3,
}: CardGridProps) {
  return (
    <Section id={id}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mx-auto max-w-2xl text-center">
            {eyebrow ? (
              <p className="text-sm font-medium text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <Heading as="h2" size="h2" className="mt-3">
                {title}
              </Heading>
            ) : null}
            {description ? (
              <p className="mt-4 text-pretty text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        )}

        <div className={`mt-12 grid grid-cols-1 gap-6 ${columnClasses[columns]}`}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="hover:border-foreground/20">
                <CardHeader>
                  {Icon ? (
                    <span className="mb-2 inline-flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  ) : null}
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
