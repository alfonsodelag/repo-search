import { ChangeEventHandler, FC } from 'react';
import { BsArrow90DegUp } from 'react-icons/bs';

import { useHasMounted } from '../../hooks/useHasMounted';

import { InputPrefix } from './InputPrefix';

interface SearchBarProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function Input({ value, onChange }: SearchBarProps) {
  return (
    <input
      role="searchbox"
      type="text"
      placeholder="Search Repository..."
      value={value}
      onChange={onChange}
      className="w-full min-w-0 inline-flex appearance-none border border-r-0 border-gray-300 rounded rounded-tl-md rounded-bl-md py-0 px-4 bg-white text-black h-10 text-base outline-none transition ease-in-out duration-150 focus:border-gray-500 focus:outline-none focus:shadow-outline-blue"
    />
  );
}

function SearchBarWrapper({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex flex-row-reverse my-6">
      <InputPrefix />
      <Input value={value} onChange={onChange} />
    </div>
  );
}

function SearchHint() {
  return (
    <div className="flex items-baseline text-lg pl-9">
      <BsArrow90DegUp size={32} />
      <span className="ml-2">
        Try to type &quot;react&quot; here to start your first search!
      </span>
    </div>
  );
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  const hasMounted = useHasMounted();

  return (
    <>
      <SearchBarWrapper value={value} onChange={onChange} />
      <div className="relative">
        {value === '' && !hasMounted.current && <SearchHint />}
      </div>
    </>
  );
};

export default SearchBar;
