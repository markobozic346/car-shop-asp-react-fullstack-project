import { createFileRoute } from "@tanstack/react-router";

import CarsPage from "@/pages/cars/CarsPage";
import { PageSection } from "@/components/PageSection";

type CarsSearchType = {
  search: string;
};

export const Route = createFileRoute("/cars")({
  validateSearch: (search: Record<string, unknown>): CarsSearchType => {
    return {
      search: (search.search as string) || "",
    };
  },
  component: () => (
    <PageSection>
      <CarsPage />
    </PageSection>
  ),
});
