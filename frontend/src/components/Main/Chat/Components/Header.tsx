import api from 'api';
import { useAppSelector } from 'hooks/useSelector';
import { useEffect } from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import ws from 'utils/websocket';

const Header = () => {
  const [contactData, setContactData] = useState({} as any);
  const [isContactOnline, setIsContactOnline] = useState(false);

  const selectedContactId = useAppSelector((state) => state.selectedContactId);

  useEffect(() => {
    api.get(`/users/${selectedContactId}`).then((resp) => {
      const { nickname, pictureHash } = resp.data.results[0];
      setContactData({ nickname, pictureHash });
    });

    const intervalId = setInterval(
      () =>
        ws.checkIsOnline!(selectedContactId, (isOnline) => {
          if (isOnline) return setIsContactOnline(true);
          setIsContactOnline(false);
        }),
      5000
    );

    return () => clearInterval(intervalId);
  }, [selectedContactId]);

  return (
    <div className='bg-header-dark text-header-dark flex w-full h-14 py-2 px-4'>
      <span className='flex'>
        <img
          src={`https://i.imgur.com/${contactData.pictureHash}`}
          className='inline h-full rounded-full'
        />
        <div className='flex flex-col justify-center ml-4'>
          <span className='text-default'>{contactData.nickname}</span>
          <CSSTransition
            classNames='fade'
            in={isContactOnline}
            appear
            timeout={300}
            unmountOnExit
          >
            <span className='text-default text-sm'>online</span>
          </CSSTransition>
        </div>
      </span>
    </div>
  );
};

export default Header;
