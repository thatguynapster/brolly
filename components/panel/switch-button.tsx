import React, { useContext, useEffect } from "react";
import { FC } from "react";
import { Transition } from "@headlessui/react";
import AuthContext from "../../context/auth-context";
import { toast } from "react-toastify";

const SwitchButton: FC<{
  className?: string;
  state: boolean;
  onSwitch: () => void;
}> = ({ className, state, onSwitch }) => {
  const { GLOBAL_OBJ } = useContext(AuthContext);

  useEffect(() => {
    console.log(GLOBAL_OBJ);
  }, [GLOBAL_OBJ]);

  return (
    <div className={`flex items-center justify-center cursor-pointer space-x-2 ${className}`} onClick={onSwitch}>
      <input type="checkbox" name="toggle" className="hidden" />
      <span className="font-semibold text-sm">No</span>
      <label className="relative w-8 h-5 flex items-center select-none cursor-pointer" htmlFor="toggle">
        <span
          className={`absolute left-0 top-0 h-full w-full ${state ? "bg-primary-main" : "bg-gray-400"}  rounded-full`}
        ></span>
        <span
          className={`mx-0.5 h-4 w-4 border-2 absolute z-10 ${
            state ? "right-0" : "left-0"
          } rounded-full bg-white transition-transform duration-300 ease-in-out flex justify-center items-center border-gray-100`}
        ></span>
      </label>
      <span className="font-semibold text-sm">Yes</span>
    </div>
  );
};

export default SwitchButton;
