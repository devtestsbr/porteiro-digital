import { MyH2 } from '@/components/MyH2';
import { useQuery } from '@tanstack/react-query';

const fetchLocation = async () => {
  const response = await fetch('/api/locations');
  const data: [number, string][] = await response.json();
  return data;
};

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['location'],
    queryFn: fetchLocation,
  });

  return (
    <>
      <MyH2>Locations</MyH2>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className='flex flex-col gap-4'>
          {data?.map(([id, nome]) => (
            <a
              className='hover:underline border p-2 border-black'
              href={`/location/${id}`}
              key={id}
            >
              {nome}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
