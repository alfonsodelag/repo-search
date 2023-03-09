import { FC } from 'react';
import { GoSearch } from 'react-icons/go';

function InputPrefixWrapper() {
  return (
    <span className="flex items-center border border-gray-300 border-r-0 rounded-l-md bg-white h-10 px-3">
      <GoSearch />
    </span>
  );
}

const InputPrefix: FC = () => <InputPrefixWrapper />;

export { InputPrefixWrapper, InputPrefix };
