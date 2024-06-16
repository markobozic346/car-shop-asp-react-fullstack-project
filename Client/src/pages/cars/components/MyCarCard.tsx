import { Car } from "@/lib/types";

type Props = {
  car: Car;
};

const MyCarCard = ({ car }: Props) => {
  return (
    <div>
      {car.make} {car.model}
    </div>
  );
};

export default MyCarCard;
