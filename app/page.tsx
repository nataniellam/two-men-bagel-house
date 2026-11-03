import Image from "next/image";
import Link from "next/link";
import RandomLetterSwapPingPong from "@/components/fancy/text/random-letter-swap-pingpong-anim";
import CommunityVideo from "@/components/CommunityVideo";
import HeroLineup from "@/components/HeroLineup";
import Marquee from "@/components/Marquee";
import OrderButton from "@/components/OrderButton";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import ExternalLabel from "@/components/ExternalLabel";
import { communityMedia, lineup, links, outlets, photos, story } from "@/lib/content";

const wrap = "mx-auto max-w-[1440px] px-4 md:px-8";
const btnInk = "press inline-flex min-h-12 items-center justify-center bg-ink px-4 text-b sm:px-6 font-bold uppercase text-paper hover:bg-ink-soft";
const btnTone = "press inline-flex min-h-12 items-center justify-center bg-tone px-4 text-b sm:px-6 font-bold uppercase text-ink hover:bg-ink hover:text-paper";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": outlets.map((o) => ({
    "@type": "Bakery",
    name: `Two Men Bagel House ${o.name}`,
    url: `https://www.twomenbagels.com/outlets/${o.slug}`,
    image: `https://www.twomenbagels.com${o.sketch}`,
    servesCuisine: "Bagels",
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      postalCode: o.postal,
      addressLocality: "Singapore",
      addressCountry: "SG",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: o.opens,
      closes: o.closes,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero: who Two Men is, the line-up, one order action */}
      <section aria-labelledby="hero-title" className="pb-16 pt-4 md:py-24">
        <div className={`${wrap} grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8`}>
          {/* Letters swap in a random order on hover and back on leave (fancycomponents.dev
              Random Letter Swap Ping Pong); aria-label names the h1, so the text is in the page once */}
          <h1 id="hero-title" aria-label="Singapore bagels, since 2014." className="display text-xl lg:col-span-7">
            <RandomLetterSwapPingPong label={"Singapore bagels, since\u00a02014."} srLabel={false} className="justify-start" />
          </h1>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-[42ch]">
              Two Men Bagel House has been baking in Singapore since 2014. Find us at five outlets: Tanjong Pagar, Novena,
              Holland Village, Joo Chiat and Punggol.
            </p>
            {/* Desktop only: phones use the bottom bar, tablets the header Order button */}
            <div className="mt-6 hidden gap-2 lg:flex">
              <OrderButton className={btnInk}>Order now</OrderButton>
              <a href="#find-us" className={btnTone}>Find an outlet</a>
            </div>
          </div>
        </div>
        <div className="mt-1 md:mt-6">
          <HeroLineup items={lineup} />
        </div>
      </section>

      <Marquee />

      {/* 2. Our story: the full brand letter */}
      <Reveal as="section" id="story" aria-labelledby="story-title" className="py-24">
        <div className={`${wrap} grid gap-10 md:grid-cols-12 md:gap-8`}>
          <div className="relative md:col-span-6">
            {/* Heading and photos stay pinned on desktop while the letter scrolls past */}
            <div className="md:sticky md:top-24">
              <h2 id="story-title" className="display reveal-item text-xl">
                Made the hard way, still.
              </h2>
              <Image
                src={photos.shirts.src}
                alt={photos.shirts.alt}
                width={2000}
                height={1300}
                sizes="(min-width: 768px) 48vw, 100vw"
                className="reveal-item mt-10 aspect-[4/3] w-full object-cover md:mt-8 md:aspect-[3/2]"
              />
              <Image
                src={photos.dough.src}
                alt={photos.dough.alt}
                width={2000}
                height={1300}
                sizes="(min-width: 768px) 24vw, 55vw"
                style={{ "--i": 1 } as React.CSSProperties}
                className="reveal-item relative -mt-16 ml-auto w-[58%] border-[10px] border-paper object-cover md:-mt-24 md:mr-[-2rem] md:w-[50%] md:border-[14px]"
              />
            </div>
          </div>
          <div className="reveal-item flex max-w-[60ch] flex-col gap-5 md:col-span-5 md:col-start-8 md:gap-7 md:text-[1.25rem] md:leading-[1.6]" style={{ "--i": 2 } as React.CSSProperties}>
            {story.map((para, i) =>
              para.startsWith("So, what") ? (
                <p key={i} className="display my-2 text-[1.5rem] leading-[1.15] md:text-[2rem]">{para}</p>
              ) : (
                <p key={i}>{para}</p>
              ),
            )}
            <p className="mt-2">
              Yours to keep,
              <br />
              <span className="display text-[2rem]" style={{ textTransform: "none" }}>tmbh</span>
            </p>
          </div>
        </div>
      </Reveal>

      {/* 3. Find us: five shop fronts */}
      <Reveal as="section" id="find-us" aria-labelledby="find-title" className="bg-tone py-20 md:py-24">
        <div className={wrap}>
          <div className="flex items-end justify-between gap-4 md:justify-start md:gap-10">
            <h2 id="find-title" className="display reveal-item text-xl">
              Find us
            </h2>
            <Image
              src="/img/sketch-crate-hero.png"
              alt=""
              width={2127}
              height={1877}
              sizes="(min-width: 768px) 260px, 34vw"
              style={{ "--i": 1 } as React.CSSProperties}
              className="reveal-item w-[34vw] max-w-[220px] -rotate-3"
            />
          </div>
          <p className="reveal-item mt-6 max-w-[46ch]" style={{ "--i": 2 } as React.CSSProperties}>
            Five outlets, open daily, each with its own signature bagel.
          </p>

          <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-8">
            {outlets.map((o, i) => (
              <li
                key={o.slug}
                style={{ "--i": i + 2 } as React.CSSProperties}
                className="reveal-item flex flex-col gap-4 bg-paper p-4 md:gap-6 md:p-8"
              >
                <Image
                  src={o.sketch}
                  alt={`Hand-drawn sketch of the ${o.name} shop front.`}
                  width={2500}
                  height={2500}
                  sizes="(min-width: 768px) 32vw, 46vw"
                  className="aspect-square w-1/2 object-contain md:w-[70%]"
                />
                <div className="flex flex-col gap-3">
                  <h3 className="display text-[2.75rem] md:text-[4rem]">{o.name}</h3>
                  <p className="text-l font-bold">Try: {o.signature}</p>
                  <div className="text-s">
                    <address className="not-italic">{o.address}</address>
                    <p>
                      {o.hours} ({o.lastOrder.toLowerCase()})
                    </p>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Link href={`/outlets/${o.slug}/menu`} className={btnInk}>
                      Menu<span className="sr-only">: {o.name}</span>
                    </Link>
                    <Link href={`/outlets/${o.slug}`} className={btnTone}>
                      Outlet page<span className="sr-only">: {o.name}</span>
                    </Link>
                    <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className={btnTone}>
                      Directions<span className="sr-only"> to {o.name}</span>
                      <ExternalLabel platform="Google Maps" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* 4. Community: photo strip, membership, email */}
      <Reveal as="section" id="community" aria-labelledby="community-title" className="py-24">
        <div className={wrap}>
          <h2 id="community-title" className="display reveal-item text-xl">
            Community
          </h2>
          <p className="reveal-item mt-4 max-w-[52ch]" style={{ "--i": 1 } as React.CSSProperties}>
            Parties, queues and the crew behind the counter. Follow along on Instagram at{" "}
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4 hover:no-underline">
              @twomenbagelhouse
              <ExternalLabel platform="Instagram" />
            </a>
            .
          </p>
        </div>

        <div className="relative mt-10 md:mt-14">
          <ul
            aria-label="Posts from Two Men"
            tabIndex={0}
            className="drag-row relative mx-auto flex max-w-[1440px] snap-x snap-mandatory gap-[4vw] overflow-x-auto px-4 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-8 lg:grid-cols-7"
          >
            {communityMedia.map((m, i) => (
              <li key={m.src} className="reveal-item w-[60vw] shrink-0 snap-start md:w-auto" style={{ "--i": i + 2 } as React.CSSProperties}>
                {m.type === "image" ? (
                  <Image
                    src={m.src}
                    alt={m.alt}
                    width={m.width}
                    height={m.height}
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 24vw, 60vw"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-300 hover:scale-[1.03] motion-reduce:transition-none"
                  />
                ) : (
                  <CommunityVideo src={m.src} poster={m.poster} label={m.label} />
                )}
              </li>
            ))}
            <li className="w-[60vw] shrink-0 snap-start md:w-auto">
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="press on-ink flex aspect-[4/5] w-full flex-col justify-end bg-ink p-6 text-paper hover:bg-ink-soft md:p-4"
              >
                <span className="display text-[2rem] leading-none md:text-[1.5rem] xl:text-[2rem]">More on Instagram</span>
                <span className="mt-2 text-s [overflow-wrap:anywhere]">
                  @twomenbagelhouse
                  <ExternalLabel platform="Instagram" />
                </span>
              </a>
            </li>
            <li className="w-[60vw] shrink-0 snap-start md:w-auto">
              <a
                href={links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="press on-ink flex aspect-[4/5] w-full flex-col justify-end bg-ink p-6 text-paper hover:bg-ink-soft md:p-4"
              >
                <span className="display text-[2rem] leading-none md:text-[1.5rem] xl:text-[2rem]">More on Facebook</span>
                <span className="mt-2 text-s [overflow-wrap:anywhere]">
                  twomenbagelhouse
                  <ExternalLabel platform="Facebook" />
                </span>
              </a>
            </li>
            <li aria-hidden="true" className="w-1 shrink-0 md:hidden" />
          </ul>
        </div>

        <div className={`${wrap} mt-20 grid gap-16 md:mt-32 md:grid-cols-12 md:gap-8`}>
          <div className="md:col-span-5">
            <h3 className="display reveal-item text-[2.75rem]">Membership</h3>
            <p className="reveal-item mt-4 max-w-[46ch]" style={{ "--i": 1 } as React.CSSProperties}>
              Bagel Revolution is our membership and points programme.
            </p>
            <a
              href={links.eber}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnInk} reveal-item mt-8`}
              style={{ "--i": 3 } as React.CSSProperties}
            >
              Join on Eber
              <ExternalLabel platform="Eber" />
            </a>
          </div>

          <div className="md:col-span-7">
            <div className="on-ink bg-ink p-6 text-paper md:p-10">
              <h3 className="display text-[2.75rem]">Get the news first</h3>
              <p className="mt-3 max-w-[40ch]">New bagels, outlet openings and events.</p>
              <div className="mt-6">
                <SignupForm tone="ink" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 5. Event orders */}
      <Reveal as="section" aria-labelledby="events-title" className="bg-tone">
        <div className="grid md:grid-cols-2">
          <div className="px-4 py-20 md:px-8 md:py-24 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))]">
            <h2 id="events-title" className="display reveal-item text-xl">
              Event orders
            </h2>
            <p className="display reveal-item mt-6 max-w-[26ch] text-[1.5rem] leading-[1.3] lg:text-[2rem]" style={{ "--i": 1 } as React.CSSProperties}>
              Plotting something? Questionable ideas? We are your accomplice.
            </p>
            <p className="reveal-item mt-6 max-w-[46ch]" style={{ "--i": 2 } as React.CSSProperties}>
              Bagels for personal and corporate events.{" "}
              <span className="placeholder">[PLACEHOLDER: what can be ordered, lead time and minimums]</span>
            </p>
            <Link href="/events-catering" className={`${btnInk} reveal-item mt-8`} style={{ "--i": 3 } as React.CSSProperties}>
              Events & Catering
            </Link>
          </div>
          <Image
            src={photos.party.src}
            alt="A Two Men event: a crowd packed in front of the bar, hands in the air."
            width={2000}
            height={1300}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/3] h-full w-full object-cover md:aspect-auto"
          />
        </div>
      </Reveal>
    </>
  );
}
