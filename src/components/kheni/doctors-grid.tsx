import { doctors } from "@/content/site";
import { DoctorCard } from "./doctor-card";

export function DoctorsGrid({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return <div className="grid gap-5 md:grid-cols-2">{doctors.map((doctor) => <DoctorCard key={doctor.slug} doctor={doctor} />)}</div>;
  }

  return (
    <div className="space-y-6">
      <DoctorCard doctor={doctors[0]} featured />
      <div className="grid gap-6 xl:grid-cols-3">
        {doctors.slice(1).map((doctor) => <DoctorCard key={doctor.slug} doctor={doctor} />)}
      </div>
    </div>
  );
}
