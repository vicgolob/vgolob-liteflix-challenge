import { ReactNode } from 'react';

function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80">
      <div className="bg-black p-3 shadow-md w-full h-full md:w-[730px] md:h-[440px]">
        {children}
      </div>
    </div>
  );
}

export default Modal;
