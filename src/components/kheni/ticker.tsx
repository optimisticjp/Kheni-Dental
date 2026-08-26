const items = ["Advanced Dentistry", "Dental Implants", "Smile Design", "International Patient Care", "Surat, India"];

export function Ticker() {
  return (
    <div className="overflow-hidden border-b border-gold/20 bg-gold text-ink" aria-label="Clinic highlights">
      <div className="ticker-track flex w-max items-center py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] sm:text-xs">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap px-5">
            {item}<span aria-hidden="true" className="ml-5 text-ink/45">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
