import CarsPage from "@/pages/cars/CarsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cars")({
  component: () => <CarsPage />,
});
