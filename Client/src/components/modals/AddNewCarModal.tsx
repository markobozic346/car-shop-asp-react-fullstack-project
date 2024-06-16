import { Car } from "@/lib/types";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "@/lib/constants";
import { getAllCarBodyTypes } from "@/lib/queries";
import { useState } from "react";
import { Button } from "../ui/button";
import { createCar } from "@/lib/mutations";
import { toast } from "sonner";
import { queryClient } from "@/routes/__root";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddNewCarModal = ({ open, onOpenChange }: Props) => {
  const [newCar, setNewCar] = useState<Omit<Car, "id" | "userId">>({
    model: "",
    make: "",
    year: 0,
    carBodyId: 0,
  });

  const { data: carBodies, isLoading: isLoadingCarBodies } = useQuery({
    queryKey: [QUERY_KEYS.CAR_BODIES],
    queryFn: getAllCarBodyTypes,
  });

  const { mutateAsync } = useMutation({
    mutationFn: createCar,
    mutationKey: [MUTATION_KEYS.CREATE_CAR],
  });

  const handleEditCarBody = (body: string) => {
    setNewCar((prev) => ({ ...prev, carBodyId: parseInt(body) }));
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCar((prev) => ({ ...prev, make: e.target.value }));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCar((prev) => ({ ...prev, model: e.target.value }));
  };
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCar((prev) => ({ ...prev, year: parseInt(e.target.value) }));
  };

  const handleUpdate = () => {
    if (!newCar.make || !newCar.model || !newCar.year || !newCar.carBodyId) {
      toast.error("All fields are required");
      return;
    }
    if (newCar.year < 1900 || newCar.year > 2024) {
      toast.error("Year is not valid, must be > 1900 and < 2024");
      return;
    }

    const promise = mutateAsync(
      {
        car: newCar,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CARS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.MY_CARS],
          });

          onOpenChange(false);
        },
      }
    );

    toast.promise(promise, {
      loading: "Updating car...",
      success: "Car updated successfully",
      error: "Error, something went wrong",
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h3>Add new</h3>
        </DialogHeader>
        <DialogDescription>Add new car for sale</DialogDescription>

        <div>
          <Label>
            Make
            <Input
              type="text"
              onChange={handleMakeChange}
              value={newCar.make}
            />
          </Label>
          <Label>
            Model
            <Input
              type="text"
              onChange={handleModelChange}
              value={newCar.model}
            />
          </Label>
          <Label>
            Year
            <Input
              type="number"
              min={1900}
              max={2024}
              onChange={handleYearChange}
              value={newCar.year}
            />
          </Label>
          <Label>
            Model
            <Select
              onValueChange={handleEditCarBody}
              disabled={isLoadingCarBodies}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {carBodies?.map((body) => (
                  <SelectItem key={body.id} value={body.id.toString()}>
                    {body.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
        </div>

        <Button onClick={handleUpdate}>Update</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCarModal;
