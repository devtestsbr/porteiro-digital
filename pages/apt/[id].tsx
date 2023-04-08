import { useRouter } from 'next/router';
import { Apartment } from '@/Apartment';

export default function Main() {
  const router = useRouter();
  const { id } = router.query;

  return <Apartment id={String(id)} />;
}
