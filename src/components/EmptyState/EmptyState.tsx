import { FC } from "react";
import { GoOctoface } from "react-icons/go";

interface EmptyStateProps {
  searchValue: string;
}

const EmptyState: FC<EmptyStateProps> = ({ searchValue }) => {
  return (
    <div className="flex flex-col items-center mt-64">
      <GoOctoface className="text-2xl" />
      <p data-testid={`nomatch-${searchValue}`} className="text-lg font-medium">
        Sorry, we couldn't find any repositories that match "{searchValue}"
      </p>
    </div>
  );
};

export { EmptyState };
