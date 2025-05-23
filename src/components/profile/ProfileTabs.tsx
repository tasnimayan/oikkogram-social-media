const ProfileTabs = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-between mb-2.5">
        <ul className="flex px-5 py-1 md:py-1.5 text-xs md:text-base font-semibold ">
          <li className="px-3 text-gray-600">
            <a href="#">Posts</a>
          </li>
          <li className="px-3 text-gray-600">
            <a href="#">About</a>
          </li>
          <li className="px-3 text-gray-600">
            <a href="#">Friends</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileTabs;
