import { MUTATION_KEYS } from "@/lib/constants";
import { createCar } from "@/lib/mutations";
import { useMutation } from "@tanstack/react-query";

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
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateCar;
