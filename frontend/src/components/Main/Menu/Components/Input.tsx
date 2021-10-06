const Input = ({ placeholder, autoFocus, value, onChange }: SearchProps) => {
  return (
    <div className='flex justify-center items-center bg-search-dark h-12 px-3 py-2 border-b border-divider'>
      <div className='rounded-full bg-search-medium px-2 py-1 w-full'>
        <svg
          viewBox='0 0 24 24'
          width='24'
          height='24'
          className='inline text-search-light'
        >
          <path
            fill='currentColor'
            d='M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z'
          ></path>
        </svg>
        <input
          className='text-search-placeholder bg-search-medium focus:outline-none ml-5'
          type='text'
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}
