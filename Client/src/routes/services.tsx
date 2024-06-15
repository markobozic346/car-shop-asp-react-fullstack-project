import ServicesPage from "@/pages/services/ServicesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: () => <ServicesPage />,
});
