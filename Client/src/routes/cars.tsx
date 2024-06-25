import { createFileRoute, redirect } from "@tanstack/react-router";

import CarsPage from "@/pages/cars/CarsPage";
import { PageSection } from "@/components/PageSection";
import { TOKEN_KEY } from "@/lib/constants";

type CarsSearchType = {
  search: string;
};

export const Route = createFileRoute("/cars")({
  beforeLoad: async () => {
    const jwt = localStorage.getItem(TOKEN_KEY);

    if (!jwt) {
      throw redirect({
        to: "/",
        search: {
          search: "",
          page: "1",
        },
      });
    }
  },
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
