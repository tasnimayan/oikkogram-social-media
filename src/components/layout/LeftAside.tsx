
import ProfileAside from "./ProfileAside";
import SocialMenu from "./SocialMenu";

/* Left Column starts from here */
const LeftAside = () => {
  return (
    <div className="col-span-3 flex flex-col gap-4">
      <ProfileAside />
      <SocialMenu />
    </div>
  );
};

export default LeftAside;
