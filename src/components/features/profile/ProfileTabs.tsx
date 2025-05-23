import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileTabs = () => {
  return (
    <div className="w-full flex justify-end border-y">
      <Tabs defaultValue="posts" className="py-1.5">
        <TabsList className="w-full py-4 bg-inherit">
          <TabsTrigger value="posts" className="px-6">
            Posts
          </TabsTrigger>
          <TabsTrigger value="about" className="px-6">
            About
          </TabsTrigger>
          <TabsTrigger value="friends" className="px-6">
            Friends
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
