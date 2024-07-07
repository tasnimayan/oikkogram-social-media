const Following = () => {
    return (
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="text-gray-600 text-sm font-semibold mb-4">Following</h3>
        <ul className="flex items-center justify-center space-x-2">
  
            <li className="flex flex-col items-center space-y-2">
                <a className="block bg-white p-1 rounded-full" href="#">
                    <img className="w-12 rounded-full" src="https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80" />
                </a>
  
                <span className="text-xs text-gray-500">
                    Sage
                </span>
            </li>
  
        </ul>
      </div>
    );
  };
  
  export default Following;