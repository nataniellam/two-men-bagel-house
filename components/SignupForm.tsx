"use client";

import { useId, useState } from "react";

type State = "idle" | "loading" | "success" | "error";

// Prototype only: no mailing-list provider is wired yet, so submit simulates a request.
// [PLACEHOLDER: connect to the owner's email provider before launch]
export default function SignupForm({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const onInk = tone === "ink";

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setError("That email address doesn’t look right. Check it and try again.");
      return;
    }
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setState("success");
  };

  if (state === "success") {
    return (
      <p role="status" className="text-l font-bold">
        You’re on the list. See you in the queue.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-[460px]">
      <label htmlFor={`${id}-email`} className="block text-b font-bold">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-2 lg:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `${id}-err` : undefined}
          onChange={() => state === "error" && setState("idle")}
          className={`min-h-12 flex-1 px-4 text-b ${onInk ? "bg-paper text-ink" : "bg-tone text-ink"} placeholder:text-ink-soft`}
          placeholder="you@example.com"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={`press min-h-12 whitespace-nowrap px-6 text-b font-bold uppercase disabled:opacity-60 ${onInk ? "bg-paper text-ink hover:bg-tone" : "bg-ink text-paper hover:bg-ink-soft"}`}
        >
          {state === "loading" ? "Signing up…" : "Sign up"}
        </button>
      </div>
      <p id={`${id}-err`} role="alert" className="mt-2 min-h-[1.5em] text-s font-bold">
        {state === "error" ? error : ""}
      </p>
    </form>
  );
}
