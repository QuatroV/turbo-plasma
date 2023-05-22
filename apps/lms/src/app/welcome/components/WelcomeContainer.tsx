import AppsContainer from "./AppsContainer";
import SearchPanel from "./SearchPanel";
import WelcomeLogo from "./WelcomeLogo";

const WelcomeContainer = () => {
  return (
    <div className="font-rubik w-full">
      <WelcomeLogo />
      <SearchPanel />
      <AppsContainer />
    </div>
  );
};

export default WelcomeContainer;
