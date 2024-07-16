'use client'

import TrashOptions from '@/components/menu/TrashOptions';
import SocialPost from '@/components/SocialPost';
import Spinner from '@/components/Spinner';
import fetchGraphql from '@/utils/fetchGraphql';
import { getTrashedPosts } from '@/utils/queries';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const TrashBin = () => {

  const {data:session} = useSession()
  const userId = session?.user.id

  // const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({queryKey:['trash-posts', userId], queryFn: async () => fetchGraphql(getTrashedPosts, {user_id:userId})})

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className='border-b pb-2'>My Trash Bin</h1>
      <div className="post-list">
        {data.data.posts?.map((post) => (
          <SocialPost key={post.id} post={post} OptionsComponent={TrashOptions}/>
        ))}
      </div>
    </div>
  );
};

export default TrashBin;
