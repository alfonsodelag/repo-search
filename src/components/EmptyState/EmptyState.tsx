import { FC } from "react";
import { GoOctoface } from "react-icons/go";

interface EmptyStateProps {
  searchValue: string;
}

const EmptyState: FC<EmptyStateProps> = ({ searchValue }) => {
  return (
    <div className="flex flex-col items-center mt-64">
      <GoOctoface className="text-2xl" />
      <p className="text-lg font-medium">
        Sorry, we couldn’t find any repositories match &quot;{searchValue}&quot;
        :(
      </p>
    </div>
  );
};

export { EmptyState };
