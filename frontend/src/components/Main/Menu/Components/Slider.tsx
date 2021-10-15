import { CSSTransition } from 'react-transition-group';

const Slider = ({ show, title, children, onClose }: SliderProps) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames='slide'
      appear
      unmountOnExit
    >
      <div className='w-100 h-full flex flex-col absolute z-20'>
        <div className='bg-newChat-light w-100 px-5 h-28 flex items-end'>
          <span className='flex'>
            <button type='button' onClick={onClose}>
              <svg viewBox='0 0 24 24' width='24' height='24'>
                <path
                  fill='currentColor'
                  d='M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z'
                ></path>
              </svg>
            </button>
            <p>{title}</p>
          </span>
        </div>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Slider;

interface SliderProps {
  show: boolean;
  title?: string;
  children: JSX.Element;
  onClose: () => void;
}
