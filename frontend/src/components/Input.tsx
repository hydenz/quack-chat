import { ReactComponent as SearchIcon } from "@assets/search.svg";
import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex justify-center items-center bg-search-dark h-12 px-3 py-2 border-b border-divider">
      <div className="rounded-full bg-search-medium px-2 py-1 w-full">
        <SearchIcon className="inline text-search-light" />
        <input
          className="text-search-placeholder bg-search-medium focus:outline-none ml-5"
          type="text"
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
