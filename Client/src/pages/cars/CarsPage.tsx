import { cn } from "@/lib/utils";
import CreateCar from "./components/CreateCar";
import MyCarList from "./components/MyCarList";
import SearchCars from "./components/SearchCars";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/cars";

const CarsPage = () => {
  const navigate = useNavigate();
  const { search } = Route.useSearch();
  const handleSorting = (value: string) => {
    navigate({
      search: () => ({
        sort: value,
        search,
      }),
    });
  };
  return (
    <div>
      <h1 className={cn("text-3xl font-semibold")}>My Cars</h1>
      <p className={cn("text-lg text-muted-foreground")}>
        Manage your own cars here.
      </p>
      <div className="flex w-full flex-col gap-4 md:flex-row justify-between">
        <SearchCars />
        <Label className="w-full max-w-[270px] items-center flex gap-2">
          Sort by:
          <Select onValueChange={handleSorting}>
            <SelectTrigger className="max-w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A-Z">A-Z</SelectItem>
              <SelectItem value="Z-A">Z-A</SelectItem>
              <SelectItem value="lowest">Price from lowest</SelectItem>
              <SelectItem value="highest">Price from highest</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <CreateCar />
      </div>
      <MyCarList />
    </div>
  );
};

export default CarsPage;
