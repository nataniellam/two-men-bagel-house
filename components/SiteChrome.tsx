"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { nav, orderLinks, outlets } from "@/lib/content";
import ExternalLabel from "./ExternalLabel";

export const OPEN_ORDER_EVENT = "tmbh:open-order";

function useDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    ref.current?.showModal();
  }, []);
  const close = useCallback(() => ref.current?.close(), []);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => opener.current?.focus?.();
    // Clicks on the backdrop land on the dialog element itself
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("close", onClose);
    d.addEventListener("click", onClick);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("click", onClick);
    };
  }, []);
  return { ref, open, close };
}

export default function SiteChrome() {
  const menu = useDialog();
  const order = useDialog();

  useEffect(() => {
    const openOrder = () => {
      menu.close();
      order.open();
    };
    window.addEventListener(OPEN_ORDER_EVENT, openOrder);
    return () => window.removeEventListener(OPEN_ORDER_EVENT, openOrder);
  }, [menu, order]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-4 md:h-20 md:px-8">
          <Link href="/" className="press -ml-2 flex min-h-11 items-center px-2" aria-label="Two Men Bagel House, home">
            <Image src="/img/tmbh-wordmark-blk.png" alt="" width={1500} height={134} priority className="h-[18px] w-auto md:h-6" />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="press flex min-h-11 items-center px-3 text-b font-bold uppercase underline-offset-[6px] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={order.open}
              className="press hidden min-h-12 items-center bg-ink px-6 text-b font-bold uppercase text-paper hover:bg-ink-soft md:flex"
            >
              Order
            </button>
            <button
              type="button"
              onClick={menu.open}
              aria-haspopup="dialog"
              className="press -mr-2 flex min-h-11 min-w-11 items-center px-2 text-b font-bold uppercase xl:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <dialog ref={menu.ref} aria-label="Site menu" className="sheet on-ink h-dvh w-screen bg-ink text-paper">
        <div className="sheet-panel flex min-h-full flex-col px-4 pb-8 md:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Image src="/img/tmbh-wordmark-blk.png" alt="Two Men Bagel House" width={1500} height={134} className="h-[18px] w-auto invert md:h-6" />
            <button type="button" onClick={menu.close} className="press -mr-2 flex min-h-11 min-w-11 items-center px-2 text-b font-bold uppercase">
              Close
            </button>
          </div>
          <nav aria-label="Main" className="mt-6">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={menu.close} className="display press flex min-h-14 items-center text-[2.75rem]">
                    {item.label}
                  </Link>
                  {/* Outlets also lists each outlet under it */}
                  {item.href === "/#find-us" && (
                    <ul className="mb-4 grid grid-cols-2 gap-x-4">
                      {outlets.map((o) => (
                        <li key={o.slug}>
                          <Link href={`/outlets/${o.slug}`} onClick={menu.close} className="press flex min-h-11 items-center text-b">
                            {o.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => {
              menu.close();
              order.open();
            }}
            className="press mt-auto min-h-14 w-full bg-paper text-l font-bold uppercase text-ink md:hidden"
          >
            Order now
          </button>
        </div>
      </dialog>

      {/* Order sheet */}
      <dialog
        ref={order.ref}
        aria-labelledby="order-title"
        className="sheet fixed inset-x-0 bottom-0 top-auto w-full bg-transparent md:inset-0 md:m-auto md:h-fit md:w-[560px]"
      >
        <div className="sheet-panel bg-paper px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5 md:px-8 md:pb-8 md:pt-7">
          <div className="flex items-start justify-between gap-4">
            <h2 id="order-title" className="display text-[2.75rem]">
              Order
            </h2>
            <button type="button" onClick={order.close} className="press -mr-2 flex min-h-11 min-w-11 items-center justify-end px-2 text-b font-bold uppercase">
              Close
            </button>
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {orderLinks.map((l) => {
              const cls = "press flex min-h-16 flex-col justify-center bg-tone px-4 py-3 hover:bg-ink hover:text-paper";
              const body = (
                <>
                  <span className="text-l font-bold uppercase">
                    {l.label}
                    {l.external && <ExternalLabel platform={l.platform} />}
                  </span>
                  <span className="text-s">{l.note}</span>
                </>
              );
              return (
                <li key={l.label}>
                  {/* Internal links use Link so they pick up the Pages base path */}
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {body}
                    </a>
                  ) : (
                    <Link href={l.href} onClick={order.close} className={cls}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-s">Delivery and online orders open on our partners’ sites.</p>
        </div>
      </dialog>

      {/* Persistent phone bar */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <button type="button" onClick={order.open} className="press h-[var(--bar-h)] bg-ink text-l font-bold uppercase text-paper">
          Order
        </button>
        <Link href="/#find-us" className="press flex h-[var(--bar-h)] items-center justify-center bg-tone text-l font-bold uppercase">
          Find us
        </Link>
      </nav>
    </>
  );
}
