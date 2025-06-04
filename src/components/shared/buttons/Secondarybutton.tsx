import { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: (...args: any[]) => any;
}

export default function SecondaryButton({
  children,
  onClick,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="duration-200 ease-in text-white w-full h-full rounded-2xl p-2 bg-blue3 hover:bg-[#FCFDE7] hover:text-blue3 cursor-pointer font-semibold text-lg"
    >
      {children}
    </button>
  );
}
