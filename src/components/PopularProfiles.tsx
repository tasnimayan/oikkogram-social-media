const PopularProfiles = () => {
    return (
        <div className="bg-white shadow rounded-2xl p-4 w-full">
          <h4 className='text-xl w-full'>Popular</h4>
  
          <div className="flex flex-col gap-2 py-3 overflow-y-auto text-sm text-gray-700">
              <div className="bg-gray-50 flex items-center justify-between p-2 rounded hover:bg-gray-100">
                <div className="">
                  <p className="font-semibold">Sajek Valley 3 night 2 days</p> 
                  <p className="text-xs text-slate-500">7 spots</p> 
                </div>
                <div>
                  23 April
                </div>
              </div>
  
              <div className="bg-gray-50 flex items-center justify-between p-2 rounded hover:bg-gray-100 ">
                <div className="">
                  <p className="font-semibold">Bandorban 4 night 3 days</p> 
                  <p className="text-xs text-slate-500">7 spots</p> 
                </div>
                <div>
                  5 April
                </div>
              </div>
  
              <div className="bg-gray-50 flex items-center justify-between p-2 rounded hover:bg-gray-100 ">
                <div className="">
                  <p className="font-semibold">Bandorban 4 night 3 days</p> 
                  <p className="text-xs text-slate-500">7 spots</p> 
                </div>
                <div>
                  5 April
                </div>
              </div>
  
            
  
          </div>
  
  
        </div>
    );
  };
  
  export default PopularProfiles;