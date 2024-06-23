import { createFileRoute, redirect } from "@tanstack/react-router";

import { TOKEN_KEY } from "../lib/constants";
import { PageSection } from "@/components/PageSection";
import { RegisterPage } from "@/pages/register/RegisterPage";

export const Route = createFileRoute("/register")({
  beforeLoad: async () => {
    const jwt = localStorage.getItem(TOKEN_KEY);

    if (jwt) {
      throw redirect({
        to: "/",
        search: {
          search: "",
          page: "1",
        },
      });
    }
  },

  component: () => (
    <PageSection>
      <RegisterPage />
    </PageSection>
  ),
});
