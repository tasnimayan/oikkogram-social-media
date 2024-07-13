const PostSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((idx) => {
        return (
          <div
            key={idx}
            className="w-full py-4 rounded shadow-md animate-pulse"
          >
            <div className="flex p-4 space-x-4 sm:px-8">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="flex-1 py-2 space-y-2">
                <div className=" w-40 h-3 rounded bg-gray-200"></div>
                <div className="w-32 h-2 rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="p-4 space-y-2 sm:px-8">
              <div className="w-full h-3 rounded bg-gray-300"></div>
              <div className="w-full h-3 rounded bg-gray-300"></div>
              <div className="w-3/4 h-3 rounded bg-gray-300"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostSkeleton;
