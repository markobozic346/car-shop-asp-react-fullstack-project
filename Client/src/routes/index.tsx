import { createFileRoute } from "@tanstack/react-router";
import { PageSection } from "@/components/PageSection";
import HomePage from "@/pages/home/HomePage";

type CarsSearchType = {
  search: string;
  page: string;
};
export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): CarsSearchType => {
    return {
      search: (search.search as string) || "",
      page: (search.page as string) || "1",
    };
  },
  component: Index,
});

function Index() {
  return (
    <PageSection>
      <HomePage />
    </PageSection>
  );
}
