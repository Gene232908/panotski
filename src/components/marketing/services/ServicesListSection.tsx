import { ServiceRow } from "@/components/marketing/services/ServiceRow";
import { services } from "@/content/services";

// Each service is its own full-width band, so the ink/white alternation
// runs edge to edge. No wrapping <Section> here — that would impose one
// background behind all of them.

export function ServicesListSection() {
  return (
    <div>
      {services.map((service, index) => (
        <ServiceRow key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
}
