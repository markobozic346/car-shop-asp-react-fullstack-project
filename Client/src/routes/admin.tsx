import { PageSection } from "@/components/PageSection";
import { USER_KEY } from "@/lib/constants";
import AdminPage from "@/pages/admin/AdminPage";

import { createFileRoute, redirect } from "@tanstack/react-router";

type CarsSearchType = {
  search: string;
};

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (user.role !== "admin") {
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
      <AdminPage />
    </PageSection>
),
});
