import UserCardSkeleton from "../skeletons/UserCardSkeleton";

const PopularProfiles = () => {
    return (
        <div className="bg-white shadow rounded-2xl p-4 w-full">
          <h4 className='text-xl w-full'>Popular</h4>
  
          <div className="flex flex-col py-3 overflow-y-auto text-sm text-gray-700"> 
            <UserCardSkeleton />
          </div>
        </div>
    );
  };
  
  export default PopularProfiles;