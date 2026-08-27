const items = [
  "Dental Implants",
  "Smile Design",
  "Kids Dental Care",
  "Root Canal Care",
  "Two Surat Locations",
  "International Patient Enquiries",
];

export function Ticker() {
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-gold/15 bg-[#080807] py-2.5 text-gold" aria-label="Clinic highlights">
      <div className="ticker-track flex w-max items-center gap-7 whitespace-nowrap pr-7">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-7 text-[.66rem] font-semibold uppercase tracking-[.2em]">
            {item}<span aria-hidden="true" className="size-1 rounded-full bg-gold/55" />
          </span>
        ))}
      </div>
    </div>
  );
}
