import React from 'react';
import SocialPost from './SocialPost';

const AllPost = () => {
    return (
        <div className="flex flex-col gap-6">
        {[2, 5, 3].map((item) => {
          return <SocialPost key={item} />;
        })}
      </div>
    );
};

export default AllPost;