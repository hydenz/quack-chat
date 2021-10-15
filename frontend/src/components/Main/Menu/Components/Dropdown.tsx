import classNames from 'classnames';

const Dropdown = ({ children, className, style }: DropdownProps) => {
  const customClassName = classNames(
    'absolute z-10 cursor-default py-2 bg-dropdown-dark',
    className
  );

  return (
    <div className={customClassName} style={style}>
      {children}
    </div>
  );
};

export default Dropdown;

interface DropdownProps {
  children: JSX.Element;
  style?: React.CSSProperties;
  className?: string;
}
