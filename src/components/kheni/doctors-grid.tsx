import { doctors } from "@/content/site";
import { DoctorCard } from "./doctor-card";

/**
 * All four doctors as an even grid. The old layout gave the first doctor a
 * full-width feature row, which pushed the rest below the fold and made the
 * team look smaller than it is.
 */
export function DoctorsGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.slug} doctor={doctor} featured={doctor.slug === "dr-mayur-kheni"} />
      ))}
    </div>
  );
}
