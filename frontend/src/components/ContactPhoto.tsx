import { ReactComponent as DefaultUserIcon } from "@assets/loading.svg";
import { HTMLAttributes, useState } from "react";

function ContactPhoto({ pictureHash, ...rest }: IContactPhotoProps) {
  const [fadeIn, setFadeIn] = useState(false);

  return (
    <span className="relative h-full w-11">
      <DefaultUserIcon className="absolute h-full w-11 z-0" />
      {pictureHash && (
        <img
          src={`https://i.imgur.com/${pictureHash}`}
          alt=""
          loading="lazy"
          className="rounded-full h-full w-11 transition-opacity ease-in duration-200 absolute opacity-0"
          style={fadeIn ? { opacity: 1 } : undefined}
          onLoad={() => setFadeIn(true)}
          {...rest}
        />
      )}
    </span>
  );
}

interface IContactPhotoProps extends HTMLAttributes<HTMLImageElement> {
  pictureHash: string;
}

export default ContactPhoto;
