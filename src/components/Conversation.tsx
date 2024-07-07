import React from 'react';

const Conversation = () => {
  let conversation:Array<{sender?:string,receiver?:string, name:string, message:string}>
  conversation = [
    {
      sender:'1',
      name:'Tasnim',
      message:'Hey! How are you?'
    },
    {
      receiver:'2',
      name:'Robin',
      message:'I am good.'
    },
    {
      receiver:'2',
      name:'Robin',
      message:'How about you?'
    },
    {
      sender:'1',
      name:'Tasnim',
      message:'Having a good day'
    },
    {
      receiver:'2',
      name:'Robin',
      message:'Where are you going?'
    },
    {
      sender:'1',
      name:'Tasnim',
      message:'I am going for a trip'
    },
    {
      sender:'1',
      name:'Tasnim',
      message:'Will you go with me?'
    }
  ] 
  return (
    <div className="grid grid-cols-12 gap-y-2">
      {
        conversation.map((message)=>{
          return (
            <>
              {
                message.sender && (<div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      {message.name[0].toUpperCase()}
                    </div>
                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      {message.message}
                    </div>
                  </div>
                </div>)
              }

              {
                message.receiver && <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    {message.name[0].toUpperCase()}
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">                              {message.message}
                    </div>
                  </div>
                </div>
              }
            </>
          )
        })
      }
    </div>

  );
};

export default Conversation;