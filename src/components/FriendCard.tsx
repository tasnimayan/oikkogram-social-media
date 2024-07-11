import React from 'react';
import { SlOptions } from "react-icons/sl";
import Avatar from './Avatar';

interface dataType {
    status: string;
    user: {
        image: string | null,
        name: string | null,
        id: string
    }
}


const FriendCard: React.FunctionComponent<dataType> = ({data}) => {
    return (
        <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
            <div className='flex items-center'>
                <Avatar
                    src={data.user?.image}
                    />
                <div className='ms-4'>
                    <p>{data.user?.name}</p>
                    <p className='text-xs text-gray-400'>20 friends</p>
                </div>

            </div>
            
            <div className="flex gap-2">
                <button>
                    <SlOptions />
                </button>
            </div>
        </div>
    );
};

export default FriendCard;