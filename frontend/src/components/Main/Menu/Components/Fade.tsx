import { Transition } from '@headlessui/react';
import React from 'react';

const Fade = ({ children, key, show }: FadeProps) => {
  return (
    <Transition
      key={key}
      show={show}
      appear
      unmount
      enter='transition-opacity ease-in duration-200'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity ease-in duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      {children}
    </Transition>
  );
};

export default Fade;

interface FadeProps {
  children?: JSX.Element;
  key?: React.Key;
  show: boolean;
}
