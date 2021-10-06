import api from 'api';
import { useAppSelector } from 'hooks/useSelector';
import { useEffect } from 'react';
import { useState } from 'react';

const Header = () => {
  const [contactData, setContactData] = useState({} as any);

  const selectedContactId = useAppSelector((state) => state.selectedContactId);

  useEffect(() => {
    api.get(`/users/${selectedContactId}`).then((resp) => {
      const { nickname, pictureHash } = resp.data.results[0];
      setContactData({ nickname, pictureHash });
    });
  }, [selectedContactId]);

  return (
    <div className='bg-header-dark text-header-dark flex w-full h-14 py-2 px-4'>
      <span>
        <img
          src={`https://i.imgur.com/${contactData.pictureHash}`}
          className='inline h-full rounded-full'
        />
        <span className='text-default ml-4'>{contactData.nickname}</span>
      </span>
    </div>
  );
};

export default Header;
