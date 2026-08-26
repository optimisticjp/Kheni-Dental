import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

type TestimonialsProps = {
  id?: string;
  title?: string;
  description?: string;
  items: Testimonial[];
};

/** Derive initials for the text avatar (no external images). */
function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Testimonial shell. Server Component. Uses text-initial avatars instead of
 * stock photos, and neutral placeholder quotes. Grid collapses to one column
 * on mobile.
 */
export function Testimonials({
  id,
  title = "What people are saying",
  description,
  items,
}: TestimonialsProps) {
  return (
    <Section id={id}>
      <Container>
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <blockquote className="text-sm leading-relaxed text-foreground">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground"
                  >
                    {initials(item.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    {item.role ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {item.role}
                      </p>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
