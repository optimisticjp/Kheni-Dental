import { Check } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export type PricingTier = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: { href: string; label: string };
  /** Visually emphasize this tier. */
  featured?: boolean;
};

type PricingTableProps = {
  id?: string;
  title?: string;
  description?: string;
  tiers: PricingTier[];
};

/**
 * Pricing-table shell. Server Component. Neutral placeholder tiers; the
 * featured tier is highlighted with a ring only (no motion). Stacks to one
 * column on mobile.
 */
export function PricingTable({
  id,
  title = "Pricing",
  description,
  tiers,
}: PricingTableProps) {
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

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col",
                tier.featured && "ring-2 ring-ring",
              )}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  {tier.period ? (
                    <span className="text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  ) : null}
                </div>
                <CardDescription className="mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-foreground"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link
                  href={tier.cta.href}
                  className={cn(
                    buttonVariants({
                      variant: tier.featured ? "default" : "outline",
                    }),
                    "w-full",
                  )}
                >
                  {tier.cta.label}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
