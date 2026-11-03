import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExternalLabel from "@/components/ExternalLabel";
import { outlets } from "@/lib/content";
import {
  addOns, bagelFlavours, bagelPrice, byoFor, byoUrl, coffee, coffeeOptions, goat, happiestMeal,
  houseSides, outletMenus, schmears, superbowl, thirstQuenchers, type Dish, type Line,
} from "@/lib/menu";

// The in-store menu board, rebuilt as HTML text. Black 3px rules come from a black grid
// showing through 3px gaps, like the board's printed cells; banded sections sit inside
// the same frame so their coloured bands are outlined too.

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return outlets.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const outlet = outlets.find((o) => o.slug === slug);
  if (!outlet) return {};
  return {
    title: `Two Men Bagel House ${outlet.name}: menu`,
    description: `The full Two Men Bagel House ${outlet.name} menu: bagel sandwiches, bowls, sides, coffee and Build Your Own Bagel.`,
  };
}

const fmt = (p?: number | string) => (p === undefined ? "" : typeof p === "number" ? (Number.isInteger(p) ? String(p) : p.toFixed(1)) : p);
const board = "grid gap-[3px] bg-ink p-[3px]";
const cell = "bg-paper p-4 md:p-5";
const items = "mt-2 text-[1rem] uppercase leading-snug";

function DishCell({ dish, className = "" }: { dish: Dish; className?: string }) {
  return (
    <div className={`${cell} flex flex-col ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="display text-[2rem] leading-none">{dish.name}</h3>
        <span className="flex shrink-0 items-center gap-2">
          <span className="display text-[1.5rem] italic leading-none">{fmt(dish.price)}</span>
          {dish.tag && <span className="bg-ink px-2.5 py-0.5 text-s font-bold uppercase text-paper [border-radius:999px]">{dish.tag}</span>}
        </span>
      </div>
      {dish.note && !dish.note.startsWith("Choice") && <p className="mt-1 text-s font-bold">{dish.note}</p>}
      <p className={items}>{dish.items}</p>
      {dish.note?.startsWith("Choice") && <p className="mt-2 text-s font-bold uppercase">{dish.note}</p>}
    </div>
  );
}

function Leaders({ lines, cols = 1 }: { lines: Line[]; cols?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-8 gap-y-1 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {lines.map((l) => (
        <li key={l.name} className="flex items-baseline gap-2 text-b font-bold uppercase leading-tight">
          <span>{l.name}</span>
          <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-1 border-b-2 border-dotted border-ink" />
          <span className="tabular-nums">{fmt(l.price)}</span>
        </li>
      ))}
    </ul>
  );
}

function Band({ id, className, children }: { id: string; className: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={`display px-4 py-3 text-center leading-none ${className}`}>
      {children}
    </h2>
  );
}

function PriceTable({ caption, rows, headers }: { caption: string; rows: Line[]; headers: [string, string] }) {
  return (
    <table className="w-full text-b font-bold uppercase">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <th scope="col" className="text-left"><span className="sr-only">Drink</span></th>
          {headers.map((h) => (
            <th key={h} scope="col" className="w-16 text-right underline underline-offset-4">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <th scope="row" className="py-0.5 text-left font-bold">
              {r.name}
              {r.note && <span className="ml-2 text-s normal-case underline underline-offset-2">{r.note}</span>}
            </th>
            <td className="text-right tabular-nums">{fmt(r.price) || <span className="sr-only">not available</span>}</td>
            <td className="text-right tabular-nums">{fmt(r.price2) || <span className="sr-only">not available</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function MenuPage({ params }: Props) {
  const { slug } = await params;
  const outlet = outlets.find((o) => o.slug === slug);
  const menu = outletMenus[slug];
  if (!outlet || !menu) notFound();
  const others = outlets.filter((o) => o.slug !== slug);

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-6 md:px-8 md:pb-40 md:pt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="display text-xl">{outlet.name} menu</h1>
          <p className="mt-3 max-w-[48ch]">
            Everything on the board at Two Men Bagel House {outlet.name}, from the {menu.richieRich.name} to your morning coffee. Prices in SGD.
          </p>
        </div>
        <p className="text-s md:text-right">
          {outlet.address}
          <br />
          {outlet.hours} · {outlet.lastOrder.toLowerCase()}
        </p>
      </div>

      {/* Top of the board: Richie Rich, outlet exclusive, swap and build */}
      <section aria-label="Specials" className={`${board} mt-8 md:grid-cols-[1fr_1fr_0.9fr]`}>
        <div className="grid grid-rows-[auto_1fr] gap-[3px]">
          <p className="display bg-leaf px-4 py-3 text-[2.75rem] leading-none text-mustard [-webkit-text-stroke:6px_#000] [paint-order:stroke_fill]">Richie Rich</p>
          <DishCell dish={menu.richieRich} />
        </div>
        <div className="grid grid-rows-[auto_auto_1fr] gap-[3px]">
          <p className="display bg-ink px-4 py-3 text-center text-[2.75rem] leading-none text-mustard">{outlet.name}</p>
          <p className="display bg-mustard px-4 py-2 text-center text-[2rem] leading-none">Exclusive</p>
          <DishCell dish={menu.exclusive} />
        </div>
        <div className="grid grid-rows-[auto_1fr_auto] gap-[3px]">
          <p className="display bg-brick px-4 py-3 text-center text-[2rem] leading-none text-paper">Swap the protein. Go vegetarian.</p>
          <p className={`${cell} text-center text-s font-bold uppercase`}>
            All proteins are replaceable with vegetarian options like falafel or sautéed wild mushrooms.{" "}
            <span className="underline underline-offset-2">No additional cost!</span>
          </p>
          <a href="#build-your-own" className="press bg-paper p-4 text-right font-bold uppercase hover:bg-mustard md:p-5">
            <span className="italic">Picky eater?</span>
            <br />
            Assemble your own damn bagelwich ↓
          </a>
        </div>
      </section>

      {/* G.O.A.T */}
      <section aria-labelledby="goat" className={`${board} mt-3`}>
        <Band id="goat" className="bg-ink text-[2.75rem] text-mustard md:text-[4rem]">
          G.O.A.T <span className="text-paper">Greatest of all time</span>
        </Band>
        <div className="grid gap-[3px] md:grid-cols-2">
          {goat.map((d) => <DishCell key={d.name} dish={d} />)}
        </div>
      </section>

      {/* Happiest meal */}
      <section aria-labelledby="happiest" className={`${board} mt-3`}>
        <Band id="happiest" className="bg-mustard text-[2.75rem] italic md:text-[4rem]">Happiest meal</Band>
        <ul className="grid gap-[3px] md:grid-cols-3">
          {happiestMeal.map((m) => (
            <li key={m.name} className={cell}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="display text-[2rem] italic leading-none">{m.name}</h3>
                <span className="display text-[1.5rem] leading-none">{m.price}</span>
              </div>
              <p className="mt-2 text-b font-bold uppercase leading-tight">{m.items}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Superbowl */}
      <section aria-labelledby="superbowl" className={`${board} mt-3`}>
        <Band id="superbowl" className="bg-leaf text-[2.75rem] md:text-[4rem]">
          Super<span className="text-paper">bowl</span>
        </Band>
        <div className="grid gap-[3px] md:grid-cols-2">
          {superbowl.map((d) => <DishCell key={d.name} dish={d} />)}
        </div>
      </section>

      {/* Sides, add-ons, schmears */}
      <div className={`${board} mt-3 md:grid-cols-3`}>
        <section aria-labelledby="sides" className="flex flex-col gap-[3px]">
          <Band id="sides" className="bg-brick text-[2rem] text-paper">House sides</Band>
          <div className={`${cell} flex-1`}>
            <p className="mb-3 text-center text-s font-bold uppercase">Served with smoked chipotle ketchup</p>
            <Leaders lines={houseSides} />
            <Image src="/img/tmbh-bagel-boys-cap.png" alt="" width={1665} height={1050} sizes="300px" className="mx-auto mt-6 w-full max-w-[280px]" />
          </div>
        </section>
        <section aria-labelledby="addons" className="flex flex-col gap-[3px]">
          <Band id="addons" className="bg-brick text-[2rem] text-paper">Add-ons</Band>
          <div className={`${cell} flex-1`}>
            <Leaders lines={addOns} />
          </div>
          <p className="bg-paper px-4 py-2 text-center text-s font-bold uppercase">No service charge</p>
        </section>
        <section aria-labelledby="schmears" className="flex flex-col gap-[3px]">
          <Band id="schmears" className="bg-brick text-[2rem] text-paper">Schmears</Band>
          <div className={`${cell} flex-1`}>
            <table className="w-full text-b font-bold uppercase leading-tight">
              <caption className="sr-only">Schmears, single serve and 300g tub prices</caption>
              <thead>
                <tr>
                  <th scope="col" className="text-left"><span className="sr-only">Schmear</span></th>
                  <th scope="col" className="w-10 text-right"><span className="sr-only">Single</span></th>
                  <th scope="col" className="w-14 text-right">300g</th>
                </tr>
              </thead>
              <tbody>
                {schmears.map((s) => (
                  <tr key={s.name}>
                    <th scope="row" className="py-0.5 text-left font-bold">{s.name}</th>
                    <td className="text-right tabular-nums">{fmt(s.price)}</td>
                    <td className="text-right tabular-nums">{fmt(s.price2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Coffee and thirst quenchers */}
      <div className={`${board} mt-3 md:grid-cols-2`}>
        <section aria-labelledby="coffee" className="flex flex-col gap-[3px]">
          <Band id="coffee" className="on-ink bg-ink text-[2.75rem] text-paper md:text-[4rem]">Coffee</Band>
          <div className={`${cell} flex-1`}>
            <PriceTable caption="Coffee, hot and iced prices" rows={coffee} headers={["Hot", "Iced"]} />
            <h3 className="mt-6 text-right text-b font-bold uppercase underline underline-offset-4">Options</h3>
            <Leaders lines={coffeeOptions} />
          </div>
        </section>
        <section aria-labelledby="thirst" className="flex flex-col gap-[3px]">
          <Band id="thirst" className="bg-mustard text-[2.75rem] italic md:text-[4rem]">Thirst quenchers</Band>
          <div className={`${cell} flex-1`}>
            <PriceTable caption="Other drinks, hot and iced prices" rows={thirstQuenchers} headers={["Hot", "Iced"]} />
          </div>
        </section>
      </div>

      {/* Build your own bagel */}
      <section id="build-your-own" aria-labelledby="byo" className={`${board} mt-3 lg:grid-cols-[1fr_0.55fr]`}>
        <div className="grid gap-[3px]">
          <div className="grid grid-cols-[96px_1fr] gap-[3px] md:grid-cols-[120px_1fr]">
            <h3 className="display flex items-center justify-center bg-mustard p-2 text-center text-l leading-none">Bagel flavours</h3>
            <div className="bg-paper p-3">
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {bagelFlavours.map((b) => (
                  <li key={b.name} className="text-center">
                    <Image src={b.src} alt="" width={864} height={864} sizes="80px" className="mx-auto aspect-square w-full max-w-[72px] object-contain" />
                    <span className="mt-1 block text-s uppercase leading-tight">{b.name}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-right text-b font-bold">Any flavour {bagelPrice}</p>
            </div>
          </div>
          {byoFor(slug).map((g) => (
            <div key={g.group} className="grid grid-cols-[96px_1fr] gap-[3px] md:grid-cols-[120px_1fr]">
              <h3 className="display flex items-center justify-center bg-mustard p-2 text-center text-l leading-none">{g.group}</h3>
              <ul className="grid gap-x-6 bg-paper p-3 sm:grid-cols-2">
                {g.items.map((l) => (
                  <li key={l.name} className="flex justify-between gap-3 text-[1rem] uppercase">
                    <span>{l.name}</span>
                    <span className="tabular-nums">{fmt(l.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-6 bg-paper p-5 md:p-8">
          <h2 id="byo" className="display text-[2.75rem] leading-[0.9] md:text-[3.5rem]">
            Build your own bagel
          </h2>
          <a
            href={byoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex min-h-12 items-center justify-center bg-ink px-6 text-b font-bold uppercase text-paper hover:bg-ink-soft"
          >
            Build yours on Oddle
            <ExternalLabel platform="Oddle" />
          </a>
        </div>
      </section>

      {/* Other outlets */}
      <nav aria-labelledby="other-menus" className="mt-16 md:mt-24">
        <h2 id="other-menus" className="display text-[2.75rem]">Other outlets’ menus</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/outlets/${o.slug}/menu`}
                className="press inline-flex min-h-12 items-center bg-tone px-5 text-b font-bold uppercase hover:bg-ink hover:text-paper"
              >
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
