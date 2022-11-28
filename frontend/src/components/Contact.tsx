import api from "@api";
import { useEffect, useState } from "react";
import classNames from "classnames";
// import { useAppDispatch } from '@hooks/useDispatch';
import db from "@utils/Dexie";
import { ReactComponent as DropdownIcon } from "@assets/dropdown.svg";
import Dropdown from "./Dropdown";
import ContactPhoto from "./ContactPhoto";

const Contact = ({
  selected,
  id,
  newContact,
  onClick,
  onDelete,
  order,
  lastMessage,
  lastMessageTimestamp,
}: ContactProps) => {
  const [contactData, setContactData] = useState<any>({});

  useEffect(() => {
    api.get(`/users/${id}`).then((resp) => {
      const { nickname, pictureHash } = resp.data.results[0];
      setContactData({ nickname, pictureHash });
    });
  }, [id]);

  // const dispatch = useAppDispatch();
  // const selectedContactId = useSelector((state) => state.selectedContactId);

  const deleteChat = async () => {
    await db.deleteContact(id);
    onDelete!();

    // dispatch({ type: ACTION_TYPES.DESELECT_CONTACT });
  };

  const className = classNames(
    {
      // 'bg-contact-active': selectedContactId === id,
      // 'hover:bg-contact-hover': selectedContactId !== id,
      "bg-contact-active": selected,
      "hover:bg-contact-hover": !selected,
      "z-10": order === 0,
    },
    "flex items-center absolute px-4 py-3 h-18 bg-contact-dark cursor-pointer w-full transition-transform duration-200 ease-in-out"
  );

  const style =
    order && order > 0
      ? { transform: `translateY(${order * 72}px)` }
      : undefined;

  const [showDropdownIcon, setShowDropdownIcon] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // const positionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hideDropdown = () => setShowDropdown(false);
    if (showDropdown)
      document
        .querySelector("#root")!
        .addEventListener("click", hideDropdown, { once: true });
    // else document.removeEventListener('click', hideDropdown);
  }, [showDropdown]);

  // const positionRefRect = positionRef.current?.getBoundingClientRect();

  // const dropdownStyle = positionRefRect && {
  //   left: positionRefRect.left,
  //   top: positionRefRect.top + positionRefRect.height,
  // };

  const dropdownIconClassName = classNames(
    showDropdownIcon ? "visible" : "invisible",
    "relative"
  );

  const handleShowDropdown = (ev: React.MouseEvent<HTMLOrSVGElement>) => {
    ev.stopPropagation();
    setShowDropdown((oldValue) => !oldValue);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={className}
      style={style}
      onMouseEnter={() => setShowDropdownIcon(true)}
      onMouseLeave={() => setShowDropdownIcon(false)}
    >
      <ContactPhoto pictureHash={contactData.pictureHash} />
      <span className="ml-3.5 flex-grow">
        <div className="flex w-full">
          <p className="text-default flex-grow">{contactData.nickname}</p>
          {lastMessageTimestamp && <p>{lastMessageTimestamp}</p>}
        </div>
        <div className="flex">
          {lastMessage && (
            <p className="text-defaultDark flex-grow">{lastMessage}</p>
          )}
          <span
            // ref={positionRef}
            className="relative"
          >
            <Dropdown
              showDropdown={showDropdown}
              className="w-56"
              // style={dropdownStyle}
            >
              <Dropdown.Item onClick={deleteChat}>Delete chat</Dropdown.Item>
            </Dropdown>
            {!newContact && (
              <DropdownIcon
                width={19}
                height={20}
                onClick={handleShowDropdown}
                className={dropdownIconClassName}
              />
            )}
          </span>
        </div>
      </span>
    </div>
  );
};

export default Contact;

interface ContactProps {
  newContact?: boolean;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  selected?: boolean;
  id: string;
  onClick: () => void;
  onDelete?: () => void;
  order?: number;
}
