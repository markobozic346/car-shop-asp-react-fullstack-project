import { Input } from "@/components/ui/input";
import { Route } from "@/routes/cars";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

const SearchCars = () => {
  const { search, sort } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: () => ({
        search: e.target.value,
        sort,
      }),
    });
  };

  return (
    <div className="relative flex-1 w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search cars..."
        type="text"
        onChange={handleSearch}
        value={search}
        className="pl-8 w-full"
      />
    </div>
  );
};

export default SearchCars;
