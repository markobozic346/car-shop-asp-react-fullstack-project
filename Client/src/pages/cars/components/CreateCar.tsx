import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import AddNewCarModal from "@/components/modals/AddNewCarModal";

const CreateCar = () => {
  const [isNewOpen, setNewOpen] = useState(false);

  const handleCreate = () => {
    setNewOpen(true);
  };
  return (
    <div>
      <Button className="flex gap-2" onClick={handleCreate}>
        Add new car
        <PlusIcon />
      </Button>
      <AddNewCarModal open={isNewOpen} onOpenChange={setNewOpen} />
    </div>
  );
};

export default CreateCar;
