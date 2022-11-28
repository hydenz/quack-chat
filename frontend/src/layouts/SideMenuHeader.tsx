import api from "@api";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { ReactComponent as DefaultUser } from "@assets/loading.svg";
import AuthContext from "@contexts/authentication";
import Dropdown from "../components/Dropdown";

const SideMenuHeader = ({
  openNewChat,
  openEditProfile,
}: ISideMenuHeaderProps) => {
  const [picFade, setPicFade] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const { id }: any = jwtDecode(accessToken);
    api.get(`/users/${id}`).then((resp) => {
      setProfilePicture(
        `https://i.imgur.com/${resp.data.results[0].pictureHash}`
      );
    });
  }, []);

  return (
    <header className="h-14 py-2 px-4 flex justify-between items-center bg-header-dark">
      <span className="h-full w-11 relative cursor-pointer">
        <img
          className="rounded-full h-full w-14 z-10 transition-opacity ease-in duration-200 absolute opacity-0"
          src={profilePicture}
          {...(picFade && { style: { opacity: 1 } })}
          alt="Your"
          onLoad={() => setPicFade(true)}
          onClick={openEditProfile}
        />
        <DefaultUser className="absolute h-full w-11 z-0" />
      </span>
      <span>
        <button
          type="button"
          onClick={openNewChat}
          className="active:bg-header-active p-2 duration-300 easy-in-out transition-colors rounded-full"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-header-light"
          >
            <path
              fill="currentColor"
              d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => setShowOptions((oldValue) => !oldValue)}
          type="button"
          className="active:bg-header-active p-2 duration-300 easy-in-out transition-colors rounded-full relative"
        >
          <Dropdown
            showDropdown={showOptions}
            className="top-10 right-full w-52"
          >
            <Dropdown.Item onClick={() => setAccessToken("")}>
              Logout
            </Dropdown.Item>
          </Dropdown>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-header-light"
          >
            <path
              fill="currentColor"
              d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
            ></path>
          </svg>
        </button>
      </span>
    </header>
  );
};

export default SideMenuHeader;

interface ISideMenuHeaderProps {
  openNewChat: () => void;
  openEditProfile: () => void;
}
