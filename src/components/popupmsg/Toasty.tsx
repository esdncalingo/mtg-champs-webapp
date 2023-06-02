import { useContext, useState } from "react";
import { ToastyContext } from "../../context/ToastyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faX,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export function useToasty() {
  const { popupMsg, setPopupMsg } = useContext(ToastyContext);
  return (msg: string, error = true) => {
    if (msg) {
      setPopupMsg([
        ...popupMsg,
        { message: msg, fail: error },
      ]);
    } else {
      throw new Error("No message provided");
    }
  };
}

interface PopUpItemProps {
  message: string;
  fail: boolean;
}

const PopUpItem = ({ message, fail }: PopUpItemProps) => {
  const [removeItem, setRemoveItem] = useState(true);
  const deleteMessage = () => {
    setRemoveItem(false);
  };

  setTimeout(() => {
    deleteMessage();
  }, 3000);

  return (
    <>
      {removeItem && (
        <div
          className={`${
            fail ? "bg-red-900" : "bg-green-900"
          } w-[fit-content]   px-[1.25rem] py-[0.5rem] pr-[0.9rem] rounded-[5px] shadow-md text-white flex flex-row gap-[1rem] items-center justify-center my-[0.5rem] cursor-pointer hover:brightness-[1.2] animate-slideDown`}
          onClick={deleteMessage}
        >
          <FontAwesomeIcon icon={fail ? faCircleXmark : faCircleCheck} />
          <p className="font-semibold">{message}</p>
          <FontAwesomeIcon
            className="border-l-[0.1rem] py-[0.35rem] pl-[1rem] scale-[0.8]"
            icon={faX}
          />
        </div>
      )}
    </>
  );
};

const Toasty = () => {
  const { popupMsg } = useContext(ToastyContext);

  return (
    <div className="fixed top-[3rem] left-[50%] translate-x-[-50%] isolate z-[200] max-h-[175px] overflow-hidden flex flex-col justtify-start items-center">
      {popupMsg.length > 0 &&
        popupMsg.map((item, index) => {
          return <PopUpItem key={index} {...item} />;
        })}
    </div>
  );
};

export default Toasty;
