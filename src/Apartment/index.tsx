import { MyH2 } from '@/components/MyH2';
import { MyInput } from '@/components/MyInput';
import mockGen from '@/mockGen';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useState } from 'react';

const fetchApartment = async (id: string) => {
  const response = await fetch(`/api/apartment/${id}`);
  const data: ReturnType<typeof mockGen.getOneApt> = await response.json();
  return data;
};

const cleanState = () =>
  ({
    name: null,
    message: null,
    contact: null,
  } as unknown as {
    name: string;
    message: string;
    contact: string;
  });

export function Apartment({ id }: { id: string }) {
  const [formData, setFormData] = useState(cleanState);
  const [sending, setSending] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['apartment', id],
    queryFn: () => fetchApartment(id),
  });
  const mutation = useMutation({
    mutationFn: () =>
      fetch(`/api/apartment/${id}`, {
        method: 'POST',
        body: JSON.stringify(formData),
      }),
  });

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData(old => ({
        ...old,
        [event.target.name]: event.target.value ?? '',
      }));
    },
    [id],
  );

  const buttonEnabled =
    Object.values(formData).filter(Boolean).length ===
    Object.keys(formData).length;

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>Wrong Apartment?</div>;
  }

  async function handleClick() {
    setSending(true);
    mutation.mutate();
    setFormData(cleanState());
  }

  return sending ? (
    <>
      <div>{mutation.isLoading ? 'Sending Message...' : 'Message Sent'}</div>
      <button
        className='mt-4 w-full bg-green-200 p-4 rounded-2xl disabled:opacity-50 disabled:bg-gray-500 disabled:text-white'
        disabled={!mutation.isSuccess}
        onClick={() => setSending(false)}
      >
        Send Another
      </button>
    </>
  ) : (
    <div className='container flex flex-col justify-center'>
      <MyH2>
        <a href={`/location/${data?.[0].slice(0, 2)}`}>&lt;</a> {data?.[1]}
      </MyH2>
      <div className='flex flex-col gap-4'>
        <div className='text-center text-lg underline'>Leave a Message</div>

        <MyInput value={formData.name} onChange={onChange} name='Name' />
        <MyInput value={formData.message} onChange={onChange} name='Message' />
        <MyInput value={formData.contact} onChange={onChange} name='Contact' />
      </div>
      <button
        className='mt-4 w-full border border-black p-3 bg-green-300 rounded-full disabled:opacity-50 disabled:bg-gray-500 disabled:text-white'
        disabled={!buttonEnabled}
        onClick={handleClick}
      >
        Send
      </button>
    </div>
  );
}
