import { cn } from "@/lib/utils";
import CarsForSale from "./components/CarsForSale";

const HomePage = () => {
  return (
    <div>
      <h1 className={cn("text-3xl font-semibold")}>Home</h1>
      <p className={cn("text-lg text-muted-foreground")}>
        Welcome to the home page. Check all cars for sale:
      </p>
      <CarsForSale />
    </div>
  );
};

export default HomePage;
