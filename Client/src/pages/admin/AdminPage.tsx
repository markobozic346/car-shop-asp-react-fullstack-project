import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CarsTab from "./tabs/CarsTab";
import UserTab from "./tabs/UserTab";
import CarBodiesTab from "./tabs/CarBodiesTab";
import AdminSearch from "./components/AdminSearch";

type Props = {
  className?: string;
};
const AdminPage = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-4 justify-center items-center",
        className
      )}
    >
      <AdminSearch />
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="flex items-center justify-center">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="cars">Cars</TabsTrigger>
          <TabsTrigger value="car-body">Car Bodies</TabsTrigger>
        </TabsList>
        <TabsContent value="cars">
          <CarsTab />
        </TabsContent>
        <TabsContent value="users">
          <UserTab />
        </TabsContent>
        <TabsContent value="car-body">
          <CarBodiesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
