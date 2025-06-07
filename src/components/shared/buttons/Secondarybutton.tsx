import { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
}

export default function SecondaryButton({
  children,
  onClick,
  disabled = false,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="duration-200 ease-in text-white w-full h-full rounded-2xl p-2 bg-blue3 hover:bg-[#FCFDE7] hover:text-blue3 cursor-pointer font-semibold text-lg"
    >
      {children}
    </button>
  );
}
