// Responsible for showing only the avatar image

interface AvatarProps {
  size?: number;
  src: string;
  border?: boolean;
}

const Avatar = ({ size = 12, src = "", border = true }: AvatarProps) => {
  return (
    <div
      className={`relative rounded-full border-gray-300 ${
        border && "border-2"
      } w-${size} h-${size}`}
    >
      <div className="w-full h-full bg-gray-200 rounded-full border-2 border-white">
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Avatar;
