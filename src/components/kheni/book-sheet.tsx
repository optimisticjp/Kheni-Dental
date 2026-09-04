"use client";

import { ArrowRight, Check, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { clinicHours, locations, site } from "@/content/site";
import { branchWhatsappUrl, whatsappUrl } from "@/lib/links";
import { pushTrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

/**
 * The appointment sheet.
 *
 * Every Book button on the site is a plain link to the contact form carrying
 * `data-book`. This component listens for clicks on those links and, when
 * JavaScript is running, opens a native `<dialog>` instead: choose a clinic,
 * then WhatsApp or call. Two taps, no form, no backend.
 *
 * `showModal()` gives focus containment, Escape and focus restoration for
 * free. Body scroll is locked while it is open. The chosen clinic is
 * remembered in localStorage as a convenience, wrapped in try/catch because
 * storage is not guaranteed.
 *
 * Nothing medical is asked, stored or sent to analytics.
 */
type Choice = "swastik-plaza" | "hirabaug" | "either";

const STORAGE_KEY = "kheni_clinic_choice";

/** Whether the clinic is open right now in India, from the clinic-provided hours. */
function openNow(now: Date): { open: boolean; label: string } {
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay();
  const minutes = ist.getHours() * 60 + ist.getMinutes();
  if (day === 0) return { open: false, label: "Closed on Sunday. Opens Monday 9:30 AM" };
  if (minutes >= 570 && minutes < 780) return { open: true, label: "Open now, until 1:00 PM" };
  if (minutes >= 960 && minutes < 1200) return { open: true, label: "Open now, until 8:00 PM" };
  if (minutes < 570) return { open: false, label: "Opens today at 9:30 AM" };
  if (minutes < 960) return { open: false, label: "Reopens today at 4:00 PM" };
  return { open: false, label: day === 6 ? "Closed. Opens Monday 9:30 AM" : "Closed. Opens tomorrow 9:30 AM" };
}

export function BookSheet() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [choice, setChoice] = useState<Choice>("either");
  const [placement, setPlacement] = useState("unknown");
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  const open = useCallback((fromPlacement: string, preset?: string) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    let remembered: string | null = null;
    try {
      remembered = localStorage.getItem(STORAGE_KEY);
    } catch {
      remembered = null;
    }
    const initial = (preset || remembered || "either") as Choice;
    setChoice(["swastik-plaza", "hirabaug", "either"].includes(initial) ? initial : "either");
    setPlacement(fromPlacement);
    setStatus(openNow(new Date()));
    dialog.showModal();
    document.body.style.overflow = "hidden";
    pushTrackingEvent({ event: "appointment_start", placement: fromPlacement, interaction: "sheet_open" });
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Intercept every Book link. Without JavaScript they still reach the form.
  // Listened for in the capture phase, so it runs before Next's Link handler
  // (which respects preventDefault) rather than after it has navigated.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-book]");
      if (!trigger) return;
      if (typeof HTMLDialogElement === "undefined" || !dialogRef.current?.showModal) return;
      event.preventDefault();
      open(trigger.dataset.placement || "unknown", trigger.dataset.branch);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.body.style.overflow = "";
    };
    const onBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", onBackdrop);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", onBackdrop);
    };
  }, []);

  const pick = (next: Choice) => {
    setChoice(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    pushTrackingEvent({ event: "location_switch", placement: "book_sheet", interaction: "select", branch: next });
  };

  const location = locations.find((l) => l.slug === choice);
  const waHref = location ? branchWhatsappUrl(location) : whatsappUrl();
  const telHref = `tel:${location?.phoneHref ?? site.primaryPhoneHref}`;
  const telLabel = location ? `Call ${location.displayArea}` : `Call ${locations[0].displayArea}`;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="book-sheet-title"
      className="sheet fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none rounded-t-[1.75rem] border-0 bg-porcelain p-0 shadow-[0_-20px_60px_-20px_rgba(18,34,74,.45)] backdrop:bg-ink/45 sm:inset-0 sm:m-auto sm:h-fit sm:max-w-md sm:rounded-[1.75rem]"
    >
      <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:p-6">
        <div aria-hidden="true" className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-ink/15 sm:hidden" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="t-eyebrow text-cobalt-deep">Book an appointment</p>
            <h2 id="book-sheet-title" className="t-h3 mt-1.5">
              Which clinic suits you?
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <div role="radiogroup" aria-label="Choose a clinic" className="mt-4 grid gap-2">
          {locations.map((l) => {
            const selected = choice === l.slug;
            return (
              <button
                key={l.slug}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => pick(l.slug as Choice)}
                className={cn(
                  `hue-${l.hue} flex min-h-14 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors`,
                  selected ? "border-cobalt bg-white ring-2 ring-cobalt" : "border-line bg-white",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("grid size-6 shrink-0 place-items-center rounded-full border", selected ? "border-cobalt bg-cobalt text-white" : "border-line-strong")}
                >
                  {selected && <Check className="size-3.5" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-tight">{l.displayArea}</span>
                  <span className="t-small block text-ink-soft">{l.shortName === l.displayArea ? l.landmark : `${l.shortName} · ${l.landmark}`}</span>
                </span>
                <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-h-fill" />
              </button>
            );
          })}
          <button
            type="button"
            role="radio"
            aria-checked={choice === "either"}
            onClick={() => pick("either")}
            className={cn(
              "flex min-h-12 items-center gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm font-medium",
              choice === "either" ? "border-cobalt bg-white ring-2 ring-cobalt" : "border-line bg-white",
            )}
          >
            <span
              aria-hidden="true"
              className={cn("grid size-6 shrink-0 place-items-center rounded-full border", choice === "either" ? "border-cobalt bg-cobalt text-white" : "border-line-strong")}
            >
              {choice === "either" && <Check className="size-3.5" />}
            </span>
            Not sure, either clinic is fine
          </button>
        </div>

        {status && (
          <p className="t-small mt-3 flex items-center gap-2 text-ink-soft">
            <span aria-hidden="true" className={cn("size-2 rounded-full", status.open ? "bg-green" : "bg-amber")} />
            {status.label}. {clinicHours.days}, {clinicHours.morning} and {clinicHours.evening}.
          </p>
        )}

        <div className="mt-4 grid gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            data-track="whatsapp_click"
            data-placement={`book_sheet_${placement}`}
            data-branch={location?.slug}
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-whatsapp text-base font-semibold text-white"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Book on WhatsApp
          </a>
          <a
            href={telHref}
            data-track="phone_click"
            data-placement={`book_sheet_${placement}`}
            data-branch={location?.slug}
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line-strong bg-white text-base font-semibold text-ink"
          >
            <Phone className="size-5 text-cobalt" aria-hidden="true" />
            {telLabel}
          </a>
        </div>

        <Link
          href="/contact/#book"
          onClick={close}
          className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-cobalt-deep"
        >
          Prefer to send a request form?
          <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
        </Link>
        <p className="t-small mt-2 text-ink-soft/80">Please keep medical details for the consultation itself.</p>
      </div>
    </dialog>
  );
}
