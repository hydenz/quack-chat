import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

const Dropdown = ({
  children,
  style,
  className,
  showDropdown,
}: IDropdownProps) => {
  const customClassName = classNames(
    "absolute z-10 cursor-default py-2 bg-dropdown-dark shadow-dropdown rounded top-5",
    className
  );

  return (
    <CSSTransition
      appear
      classNames="scale"
      in={showDropdown}
      timeout={100}
      unmountOnExit
    >
      <div className={customClassName} style={style}>
        <ul>{children}</ul>
      </div>
    </CSSTransition>
  );
};

Dropdown.Item = ({ children, onClick }: IDropdownItemProps) => {
  return (
    <li
      className="px-4 py-2 hover:bg-dropdown-hover cursor-pointer text-default"
      onClick={onClick}
    >
      {children}
    </li>
  );
};

interface IDropdownProps {
  children: JSX.Element;
  style?: React.CSSProperties;
  className?: string;
  showDropdown: boolean;
}

interface IDropdownItemProps {
  children: string;
  onClick: (ev: React.MouseEvent<HTMLLIElement>) => void;
}

export default Dropdown;
