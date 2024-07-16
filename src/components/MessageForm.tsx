
import { LuSendHorizonal } from "react-icons/lu";
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import fetchGraphql from '@/utils/fetchGraphql';
import { sendMessage } from '@/utils/queries';

import { useForm } from 'react-hook-form';


const MessageForm = () => {
  const params = useParams()
  const convId = params.convId


  const { register, handleSubmit, reset } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const variables = {
        conversation_id: convId,
        message: data.message
      };
      return await fetchGraphql(sendMessage, variables);
    }
  });

  // Function to handle form submission
  const onSubmit = (data) => {
    mutate(data);
    reset();
  };


  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">

      <div className="flex-grow ml-2">
        <div className="relative w-full">
          <input
            {...register('message')}
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="ml-4">
        <button
          type="submit" // Change button type to submit
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-2 flex-shrink-0"
        >
          <LuSendHorizonal className='text-2xl'/>
        </button>
      </div>
    </form>
    </div>

    
  );
};

export default MessageForm;