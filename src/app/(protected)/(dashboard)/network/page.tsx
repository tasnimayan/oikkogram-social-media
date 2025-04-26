
import dynamic from 'next/dynamic';
const Peoples = dynamic(()=>import('@/components/Peoples'))


const AllPeoples = () => {
  return (
    <div>
      <h2>People you may know</h2>
      <div>
          <Peoples />
      </div>
    </div>
  );
}


export default AllPeoples;