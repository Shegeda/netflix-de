import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative mt-3">
      <input
        onChange={onChange}
        type={type}
        value={value}
        id={id}
        required
        placeholder=" "
        className="block w-full px-4 pt-6 pb-1 rounded border border-[#808080] bg-transparent text-white peer 
        focus:outline-none focus:border-white"
      />
      <label
        htmlFor={id}
        className="absolute text-[#b9b9b9] duration-150 transform scale-75 top-1 z-10 origin-left left-4
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3
        peer-focus:scale-75 peer-focus:translate-y-0"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
