import { createFileRoute } from "@tanstack/react-router";
import { PageSection } from "@/components/PageSection";
import HomePage from "@/pages/home/HomePage";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageSection>
      <HomePage />
    </PageSection>
  );
}
