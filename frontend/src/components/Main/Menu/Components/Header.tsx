import api from 'api';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { ReactComponent as DefaultUser } from 'assets/loadingPicture.svg';

const Header = ({ openNewChat, openEditProfile }: HeaderProps) => {
  const [profilePicture, setProfilePicture] = useState('');
  useEffect(() => {
    const { id }: any = jwtDecode(localStorage.getItem('accessToken')!);
    api.get(`/users/${id}`).then((resp) => {
      setProfilePicture(
        `https://i.imgur.com/${resp.data.results[0].pictureHash}`
      );
    });
  }, []);
  const [picFade, setPicFade] = useState(false);

  return (
    <header className='h-14 py-2 px-4 flex justify-between items-center bg-header-dark'>
      <span className='h-full w-11 relative cursor-pointer'>
        <img
          className='rounded-full h-full w-11 z-10 transition-opacity ease-in duration-200 absolute opacity-0'
          src={profilePicture}
          {...(picFade && { style: { opacity: 1 } })}
          alt='Your'
          onLoad={() => setPicFade(true)}
          onClick={openEditProfile}
        />
        <DefaultUser className='absolute h-full w-11 z-0' />
      </span>
      <button
        type='button'
        onClick={openNewChat}
        className='active:bg-header-active p-2 duration-300 easy-in-out transition-colors rounded-full'
      >
        <svg
          viewBox='0 0 24 24'
          width='24'
          height='24'
          className='text-header-light'
        >
          <path
            fill='currentColor'
            d='M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z'
          ></path>
        </svg>
      </button>
    </header>
  );
};

export default Header;

interface HeaderProps {
  openNewChat: () => void;
  openEditProfile: () => void;
}
