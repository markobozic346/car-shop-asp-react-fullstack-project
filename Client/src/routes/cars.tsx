import { createFileRoute } from "@tanstack/react-router";

import CarsPage from "@/pages/cars/CarsPage";
import { PageSection } from "@/components/PageSection";

export const Route = createFileRoute("/cars")({
  component: () => (
    <PageSection>
      <CarsPage />
    </PageSection>
  ),
});
