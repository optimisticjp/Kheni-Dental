import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

/**
 * Hero shell. Server Component that renders its content inside a single small
 * Client Component (`FadeIn`) — the only Motion on the page. Everything else
 * (layout, links, typography) is server-rendered and static.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <Container className="max-w-3xl text-center">
        <FadeIn>
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {eyebrow}
            </span>
          ) : null}

          <Heading as="h1" size="h1" className="mt-6">
            {title}
          </Heading>

          {subtitle ? (
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full sm:w-auto",
                  )}
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full sm:w-auto",
                  )}
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </FadeIn>
      </Container>
    </Section>
  );
}
