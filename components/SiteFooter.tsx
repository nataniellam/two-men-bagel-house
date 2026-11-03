import Image from "next/image";
import SignupForm from "./SignupForm";

function Scallops({ count, className }: { count: number; className?: string }) {
  const w = 100;
  const d = Array.from({ length: count }, (_, i) => `M${i * w} 50 A${w / 2} ${w / 2} 0 0 1 ${(i + 1) * w} 50`).join(" ");
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${count * w} 50`} preserveAspectRatio="none" className={`block h-6 w-full md:h-10 ${className ?? ""}`}>
      <path d={`${d} Z`} fill="var(--paper)" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="on-ink bg-ink pb-16 pt-16 text-paper md:pb-24 md:pt-24">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="text-ink lg:mx-[8.33%]">
          <Scallops count={6} className="md:hidden" />
          <Scallops count={12} className="hidden md:block" />
          <div className="bg-paper px-5 pb-6 pt-8 md:px-12 md:pb-10 md:pt-12">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="display text-[2.75rem]">See you in the queue</h2>
                <p className="mt-4 max-w-[46ch]">
                  News, new bagels and events, straight to your inbox. <span className="placeholder">[PLACEHOLDER: how often emails go out]</span>
                </p>
                <div className="mt-6">
                  <SignupForm />
                </div>
              </div>
              <Image
                src="/img/tmbh-bagel-boys-cap.png"
                alt="The Two Men bagel boys: two bagels in caps, one holding a coffee."
                width={1665}
                height={1050}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="mx-auto w-full max-w-[460px]"
              />
            </div>
            <p className="mt-10 text-center text-s">© {new Date().getFullYear()} Two Men Bagel House. Made the hard way, still.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
