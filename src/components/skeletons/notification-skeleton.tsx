export default function NotificationSkeleton() {
  return (
    <>
      {[1, 2, 3].map((idx) => {
        return (
          <div key={idx} className="w-full rounded-lg shadow-sm animate-pulse border my-1 p-2">
            <div className="flex space-x-3">
              <div className="flex-shrink-0 size-12 rounded-full bg-gray-200"></div>
              <div className="flex-1 py-2 space-y-2">
                <div className=" w-40 h-3 rounded bg-gray-200"></div>
                <div className="w-24 h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
