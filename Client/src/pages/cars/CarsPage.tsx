import { cn } from "@/lib/utils";
import CreateCar from "./components/CreateCar";
import MyCarList from "./components/MyCarList";

const CarsPage = () => {
  return (
    <div>
      <h1 className={cn("text-3xl font-semibold")}>My Cars</h1>
      <p className={cn("text-lg text-muted-foreground")}>
        Manage your own cars here.
      </p>
      <div className="flex w-full justify-end items-end">
        <CreateCar />
      </div>
      <MyCarList />
    </div>
  );
};

export default CarsPage;
