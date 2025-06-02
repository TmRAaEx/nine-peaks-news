import { ReactNode } from "react";

export default function SecondaryButton({ children }: { children: ReactNode }) {
  return (
    <>
      <button className="duration-200 ease-in w-full rounded-2xl p-2 bg-[#21ACD2] hover:bg-[#FCFDE7] hover:text-[#21ACD2] cursor-pointer font-semibold text-lg">
        {children}
      </button>
    </>
  );
}
