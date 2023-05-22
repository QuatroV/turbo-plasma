import Logo from "~/app/header/Logo";

const WelcomeLogo = () => {
  return (
    <div className="py-32">
      <div className=" relative flex w-full -skew-x-6 flex-col items-center justify-center  text-9xl font-black text-gray-100">
        <div className="flex">
          <div className="z-20">PL</div>
          <Logo variant="white" />
          <div className="z-20">SM</div>
          <div className="z-20">A</div>
        </div>
        <div className="flex justify-end text-3xl font-semibold text-gray-100">
          Educational system
        </div>
      </div>
    </div>
  );
};

export default WelcomeLogo;
