import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

const Dropdown = ({
  children,
  style,
  className,
  showDropdown,
}: DropdownProps) => {
  const customClassName = classNames(
    'absolute z-10 cursor-default py-2 bg-dropdown-dark shadow-dropdown rounded top-5',
    className
  );

  return (
    <CSSTransition
      appear
      classNames='scale'
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

export default Dropdown;

interface DropdownProps {
  children: JSX.Element;
  style?: React.CSSProperties;
  className?: string;
  showDropdown: boolean;
}
