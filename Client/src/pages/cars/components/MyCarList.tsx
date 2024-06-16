import { useQuery } from "@tanstack/react-query";

import MyCarCard from "./MyCarCard";
import { getMyCars } from "@/lib/queries";
import { QUERY_KEYS } from "@/lib/constants";

const MyCarList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.MY_CARS],
    queryFn: getMyCars,
  });

  if (isError) {
    return <div>something went wrong...</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data?.map((car) => <MyCarCard car={car} />)}
    </div>
  );
};

export default MyCarList;
