import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

type Props = {
  className?: string;
};

const HomePage = ({ className }: Props) => {
  return (
    <div>
      <h1 className={cn("text-3xl font-semibold")}>Home</h1>
      <p className={cn("text-lg text-muted-foreground")}>
        Welcome to the home page.
      </p>
    </div>
  );
};

export default HomePage;
