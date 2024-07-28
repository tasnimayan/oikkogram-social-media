// Responsible for showing only the avatar image

interface AvatarProps {
  src: string;
  size?: number;
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
          src={src ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
          alt="avatar"
          className="w-full h-full object-cover rounded-full bg-no-repeat"
        />
      </div>
    </div>
  );
};

export default Avatar;
