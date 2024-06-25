import { PageSection } from "@/components/PageSection";
import { TOKEN_KEY } from "@/lib/constants";
import FavoritesPage from "@/pages/favorites/FavoritesPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
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
  component: () => {
    return (
      <PageSection>
        <FavoritesPage />
      </PageSection>
    );
  },
});
