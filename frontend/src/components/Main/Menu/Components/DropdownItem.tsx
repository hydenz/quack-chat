const DropdownItem = ({ text, onClick }: DropdownItemProps) => {
  return (
    <li
      className='px-4 py-2 hover:bg-dropdown-hover cursor-pointer text-default'
      onClick={onClick}
    >
      {text}
    </li>
  );
};

export default DropdownItem;

interface DropdownItemProps {
  text: string;
  onClick: (ev: React.MouseEvent<HTMLLIElement>) => void;
}
