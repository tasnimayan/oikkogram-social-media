export const MessagesSkeleton = () => {
  return (
    <div className="h-full sm:px-4 py-4">
      <div className="flex flex-col gap-y-2 mt-auto animate-pulse px-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`} data-id={index}>
            <div className="max-w-[75%]">
              <div
                className={`w-40 h-8 rounded-2xl px-4 py-2 break-words cursor-pointer transition-all duration-200 bg-gray-200 ${
                  index % 2 === 0 ? "rounded-br-none" : "rounded-bl-none"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
