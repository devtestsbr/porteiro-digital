import { MyH2 } from '@/components/MyH2';
import { getAptsResult } from '@/mockGen';
import { useQuery } from '@tanstack/react-query';

const fetchLocation = async (id: string) => {
  const response = await fetch(`/api/apartments/${id}`);
  const data: getAptsResult = await response.json();
  return data;
};

export function Location({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['location', id],
    queryFn: () => fetchLocation(id),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Wrong Address?</div>;
  }

  return (
    <div>
      <MyH2>
        <a href='/'>&lt;</a> {data?.location}
      </MyH2>
      <div className='flex gap-2 max-w-lg mx-auto flex-wrap'>
        {data?.apt.map(a => (
          <a
            className='w-32 border-black h-20 border p-2 text-center text-xl align-middle block bg-gray-400 hover:bg-green-400 rounded-lg'
            key={a[0]}
            href={`/apt/${a[0]}`}
          >
            {a[1]}
          </a>
        ))}
      </div>
    </div>
  );
}
