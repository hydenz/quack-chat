import api from 'api';
import jwtDecode from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as CameraIcon } from 'assets/camera.svg';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { ReactComponent as CheckMarkIcon } from 'assets/checkmark.svg';
import { createPortal } from 'react-dom';

const EditProfile = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [hoveringPicture, setHoveringPicture] = useState(false);
  const [showPicCropper, setShowPicCropper] = useState(false);

  useEffect(() => {
    const { id }: any = jwtDecode(localStorage.getItem('accessToken')!);
    api.get(`/users/${id}`).then((resp) => {
      setProfilePicture(
        `https://i.imgur.com/${resp.data.results[0].pictureHash}`
      );
    });
  }, []);

  const [nickNameEditable, setNickNameEditable] = useState(false);

  const nicknameRef = useRef<HTMLSpanElement>(null);

  const handleEdit = () => {
    setNickNameEditable(true);
    nicknameRef.current?.focus();
  };

  useEffect(() => {
    if (nickNameEditable) nicknameRef.current?.focus();
  }, [nickNameEditable]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const firstCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!showPicCropper) return;
    const img = new Image();
    img.onload = () => {
      canvasRef.current?.getContext('2d')?.drawImage(img, 0, 0);
    };
    img.src = URL.createObjectURL(fileInputRef.current?.files![0]);
  }, [showPicCropper]);

  return (
    <>
      <div className='bg-contact-dark flex-grow'>
        <div
          className='animate-bounce-in'
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div
            className='w-50 mx-auto my-8 relative flex justify-center items-center rounded-full'
            onMouseEnter={() => setHoveringPicture(true)}
            onMouseLeave={() => setHoveringPicture(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={profilePicture}
              alt='My profile'
              className='rounded-full cursor-pointer'
            />
            <input
              type='file'
              accept='image/gif,image/jpeg,image/jpg,image/png'
              className='hidden'
              onChange={() => setShowPicCropper(true)}
              ref={fileInputRef}
            />
            <span className='absolute text-default cursor-pointer h-full w-full rounded-full hover:bg-editProfile-photopicker-overlay transition-background-color ease-in-out duration-200'>
              {hoveringPicture && (
                <div className='flex flex-col items-center justify-center h-full w-full rounded-full mt-3'>
                  <CameraIcon width='24' />
                  <p className='uppercase text-center leading-4 mt-2'>
                    Change Profile Picture
                  </p>
                </div>
              )}
            </span>
          </div>
        </div>
        <div className='animate-slide-down'>
          <div className='px-8 py-2 shadow-editProfile'>
            <span className='text-editProfile-teal'>Name</span>
            <div className='flex mt-3'>
              <span
                className='text-default flex-grow'
                contentEditable={nickNameEditable}
                ref={nicknameRef}
                onInput={(e) => console.log(e)}
              >
                Marcelo
              </span>
              {nickNameEditable ? (
                <CheckMarkIcon
                  width={24}
                  className='cursor-pointer'
                  onClick={() => setNickNameEditable(false)}
                />
              ) : (
                <EditIcon
                  width={24}
                  className='cursor-pointer'
                  onClick={handleEdit}
                />
              )}
            </div>
          </div>
          <div className='px-8 py-2'>
            This is not your username. This nickname will be visible to all
            Whatsapp 2 users.
          </div>
          <span className='text-editProfile-teal px-8'>Recado</span>
        </div>
      </div>
      {showPicCropper &&
        createPortal(
          <div className='fixed w-full h-100vh z-50 flex justify-center items-center bg-modal-backdrop'>
            <div className='h-120.2 w-120.2 flex flex-col overflow-hidden'>
              <header className='h-12 pr-5 pl-6 flex items-center bg-modal-header rounded-sm'>
                <button onClick={() => setShowPicCropper(false)}>
                  <svg viewBox='0 0 24 24' width='24' height='24'>
                    <path
                      fill='currentColor'
                      d='M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z'
                    ></path>
                  </svg>
                </button>
                Drag the image to adjust
              </header>
              <div className='flex-grow relative'>
                <div
                  className='absolute'
                  style={{ width: '642px', height: '361px', left: '-71px' }}
                >
                  <canvas
                    className='absolute block w-full h-full'
                    width='1920'
                    height='1080'
                    ref={firstCanvasRef}
                    onClick={console.log}
                  ></canvas>
                  <canvas
                    width='1920'
                    height='1080'
                    className='w-full h-full'
                    ref={canvasRef}
                    onClick={console.log}
                  ></canvas>
                </div>
              </div>
            </div>
          </div>,
          document.querySelector('#root')!
        )}
    </>
  );
};

export default EditProfile;
