interface IButton {
  children: string;
  width: string;
}

export const Button = ({ children, width }: IButton) => {
  return (
    <>
      <button
        className={`flex justify-center items-center rounded-full border-2 border-orange-400 bg-orange-400 text-white  hoverable:hover:bg-orange-700 hoverable:hover:border-orange-700 active:bg-orange-700 active:border-orange-700 transition-colors duration-200 ease-in-out ${width} h-11`}
      >
        {children}
      </button>
    </>
  );
};
