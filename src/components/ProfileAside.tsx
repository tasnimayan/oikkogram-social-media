interface Props{
    profile?: {
        photo:string
        name:string


    }
}

const ProfileAside = ({profile}:Props) => {
    const BASE_URL = "http://localhost:3000"
    if(!profile){
        return <>No profile found</>
    }
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow overflow-hidden">
        <div className="flex flex-col items-center w-full mx-auto p-4">
            <div className="flex h-32 w-full justify-center rounded-xl" >
                <img src={BASE_URL+ profile.photo} className="flex h-32 w-full justify-center rounded-xl bg-cover" /> 
            </div> 
            <div className="mt-4 flex flex-col items-center">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    {profile.name}
                </h4>
                <p className="text-sm font-normal text-gray-600">Agency</p>
            </div>
            <div className="mt-2 mb-3 flex gap-14 md:gap-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-bold text-navy-700 dark:text-white">17</p>
                    <p className="text-sm font-normal text-gray-600">Posts</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-bold text-navy-700 dark:text-white">
                        9.7K
                    </p>
                    <p className="text-sm font-normal text-gray-600">Followers</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-bold text-navy-700 dark:text-white">
                        4.3
                    </p>
                    <p className="text-sm font-normal text-gray-600">Rating</p>
                </div>
            </div>
            <div className="flex mt-2">
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Follow</a>
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ms-3">Profile</a>
        
            </div>
        </div>

            
    </div>

  );
};

export default ProfileAside;