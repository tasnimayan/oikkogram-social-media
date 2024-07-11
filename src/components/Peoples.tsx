'use client'
import React, { useEffect, useState } from 'react';
import PeopleCard from './PeopleCard';
import fetchGraphql from '@/utils/fetchGraphql';
import { getAllPeople } from '@/utils/queries';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { useSession } from 'next-auth/react';

const Peoples = () => {
  const [people, setPeople] = useState()
  const [loading, setLoading] = useState(true)
  const {data:session} = useSession()

  useEffect(()=>{
    const getPeople = async ()=> {
      setLoading(false)
      try {
        let variables = {
          id: session.user?.id
        }
        const response = await fetchGraphql(getAllPeople, variables)

        if(response.errors){
          setLoading(true)
          return toast.error(response.errors[0].extensions.code);
        }
        
        setPeople(response.data.users)
        setLoading(true)
      }
      catch(err){
        console.error('Error Fetching Data:', err);
        setLoading(true)
      }
    }
    getPeople()
  },[])


  if(!loading){
     return <Spinner className='p-6 mt-6'/>
  }

  return (
    <>
      {
        people?.map((item, idx) => {
          return <PeopleCard key={idx} people={item}/>;
        }) 
      }
    </>
  );
};

export default Peoples;