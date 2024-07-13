import Link from "next/link";
import Avatar from "./Avatar";
import { UserType } from "@/utils/Interface";

const UserCard = ({ user }: { user: UserType }) => {
  return (
    <div className="flex w-full bg-white items-center rounded-lg">
      <div className="flex items-center">
        <Avatar
          src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
          border={false}
          size={10}
        />

        <div className="ms-2 text-sm font-semibold">
          <Link href={"/user/1"} className="hover:border-b border-blue-500">
            Ismail Hasan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
