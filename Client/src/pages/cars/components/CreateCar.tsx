import { Button } from "@/components/ui/button";
import { MUTATION_KEYS } from "@/lib/constants";
import { createCar } from "@/lib/mutations";
import { useMutation } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

const CreateCar = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCar,
    mutationKey: [MUTATION_KEYS.CREATE_CAR],
  });

  const handleCreate = () => {
    mutate({
      car: {
        model: "Giulietta",
        make: "Alfa Romeo",
        year: 2013,
        carBodyId: 4,
      },
    });
  };

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Button className="flex gap-2" onClick={handleCreate}>
        Add new car
        <PlusIcon />
      </Button>
    </div>
  );
};

export default CreateCar;
