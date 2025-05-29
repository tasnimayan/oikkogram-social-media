"use client";

interface AttachmentsProps {
  attachments: string[];
}

const Attachments = ({ attachments }: AttachmentsProps) => {
  return (
    <div className={`mt-3 grid gap-1 ${attachments.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
      {attachments.slice(0, 4).map((url, index) => {
        const mediaCount = attachments.length;
        return (
          <div
            key={`media-${index}`}
            className={`relative rounded-md overflow-hidden ${mediaCount > 2 && index >= 2 ? "max-h-40" : "max-h-96"}`}
          >
            <img src={url || ""} alt={`Post content ${index + 1}`} className="w-full h-full object-cover" />
            {mediaCount > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white font-medium text-xl">+{mediaCount - 4}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Attachments;
