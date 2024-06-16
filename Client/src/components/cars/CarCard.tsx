import { QUERY_KEYS } from "@/lib/constants";
import { getCarBodyType } from "@/lib/queries";
import { Car } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

type Props = {
  car: Car;
  className?: string;
};

const CarCard = ({ car, className }: Props) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.CAR_BODY, car.id],
    queryFn: () => {
      return getCarBodyType({ carBodyId: car.carBodyId });
    },
  });
  return (
    <div
      className={cn(
        "rounded-xl md:h-[200px] md:flex-row flex-col w-full border justify-between border-gray-600/20 p-4 flex gap-6",
        className
      )}
    >
      <img src="placeholder.jpg" className="h-full" />
      <div className="flex-1">
        <h1 className="text-2xl font-bold">
          {car.make} {car.model}
        </h1>

        <div className="mt-10">
          <p className="text-xl font-medium">1000$</p>
          <p className="text-xs text-gray-500">+ dodatni troskovi kupovine</p>
        </div>
        <div className="flex gap-2 items-center text-sm mt-2">
          <p>Godiste</p>
          <p>{car.year}</p>
        </div>
        {data?.type && (
          <div className="flex gap-2 items-center text-sm mt-2">
            <p>Karoserija</p>
            <p>{data?.type}</p>
          </div>
        )}
      </div>
      <div className="flex items-end ">
        <Button className="w-[200px]">Pozovi</Button>
      </div>
    </div>
  );
};

export default CarCard;
