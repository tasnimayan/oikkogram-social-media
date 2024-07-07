import React from 'react';
import PopularProfiles from './PopularProfiles';
import Following from './Following';

const RightAside = () => {
    return (
    <div className="col-span-3 relative">
        {/* right sidebar content here */}
        <div className="w-full space-y-4">
          <PopularProfiles />
          <Following />
        </div>
    </div>
    );
};

export default RightAside;