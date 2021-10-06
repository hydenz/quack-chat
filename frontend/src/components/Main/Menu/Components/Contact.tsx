import api from 'api';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from 'hooks/useSelector';
import { useAppDispatch } from 'hooks/useDispatch';
import { ACTION_TYPES } from 'store';
import db from 'utils/Dexie';
import loadingPicture from 'assets/loadingPicture.svg';

const Contact = ({
  id,
  newContact,
  onClick,
  order,
  lastMessage,
}: ContactProps) => {
  const [contactData, setContactData] = useState<any>({});
  useEffect(() => {
    api.get(`/users/${id}`).then((resp) => {
      const { nickname, pictureHash } = resp.data.results[0];
      setContactData({ nickname, pictureHash });
    });
  }, [id]);

  const selectedContactId = useAppSelector((state) => state.selectedContactId);
  const dispatch = useAppDispatch();

  const deleteChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await db.deleteContact(id);
    // await db.messages.where('contactId').equals(id).delete();
    // await db.contacts.where('id').equals(id).delete();
    dispatch({ type: ACTION_TYPES.DESELECT_CONTACT });
  };

  // const lastMessage = useLiveQuery(async () => {
  //   const messages = await db.messages.where('contactId').equals(id).toArray();
  //   if (messages.length) {
  //     return messages.sort((a, b) => b.firstTimestamp - a.firstTimestamp)[0]
  //       .content;
  //   }
  // }, []);

  const className = classNames(
    {
      'bg-contact-active': selectedContactId === id,
      'hover:bg-contact-hover': selectedContactId !== id,
      absolute: !newContact,
      'z-10': order === 0,
    },
    'flex items-center px-4 py-3 h-18 bg-contact-dark cursor-pointer w-full transition-transform duration-200 ease-in-out'
  );

  const style =
    order && order > 0
      ? { transform: `translateY(${order * 72}px)` }
      : undefined;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={className}
      style={style}
    >
      <img
        src={`https://i.imgur.com/${contactData.pictureHash}`}
        alt='Contact'
        style={{ backgroundImage: `url(${loadingPicture})` }}
        className='rounded-full h-full w-11'
      />
      <span className='ml-3.5'>
        <p className='text-default'>{contactData.nickname}</p>
        {lastMessage && <p className='text-defaultDark'>{lastMessage}</p>}
        {/* {lastMessage && !newContact && (
          <p className='text-defaultDark'>{lastMessage}</p>
        )} */}
      </span>
      <button
        type='button'
        className='ml-auto text-message-content'
        onClick={deleteChat}
      >
        Deletar
      </button>
    </div>
  );
};

export default Contact;

interface ContactProps {
  newContact?: boolean;
  lastMessage?: string;
  id: string;
  onClick: () => void;
  order?: number;
}
