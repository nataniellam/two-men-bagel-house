import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { outlets } from "@/lib/content";

// Stub pages so the prototype's navigation resolves. Each template is built in a later phase.
const pages: Record<string, { title: string; description: string; phase: string }> = {
  "events-catering": { title: "Events & Catering", description: "Bagels for personal and corporate events from Two Men Bagel House.", phase: "phase 4" },
  community: { title: "Community", description: "Membership, news and events from Two Men Bagel House.", phase: "phase 4" },
  "join-us": { title: "Join Us", description: "Work at Two Men Bagel House.", phase: "phase 5" },
  ...Object.fromEntries(
    outlets.map((o) => [
      `outlets/${o.slug}`,
      {
        title: o.name,
        description: `Two Men Bagel House ${o.name}: menu, hours and location.`,
        phase: "phase 3",
      },
    ]),
  ),
};

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return Object.keys(pages).map((k) => ({ slug: k.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = pages[(await params).slug.join("/")];
  if (!page) return {};
  return { title: `Two Men Bagel House ${page.title}`, description: page.description };
}

export default async function StubPage({ params }: Props) {
  const page = pages[(await params).slug.join("/")];
  if (!page) notFound();
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-24 md:px-8">
      <h1 className="display text-xxl">{page.title}</h1>
      <p className="mt-6 max-w-[46ch]">
        <span className="placeholder">[PLACEHOLDER: this page is built in {page.phase} of the redesign]</span>
      </p>
      <Link href="/" className="press mt-8 inline-flex min-h-11 items-center font-bold uppercase underline underline-offset-4">
        Back to the homepage
      </Link>
    </section>
  );
}
