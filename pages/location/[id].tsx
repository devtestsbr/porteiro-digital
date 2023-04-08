import { useRouter } from 'next/router';
import { Location } from '@/Location';

export default function Main() {
  const router = useRouter();
  const { id } = router.query;

  return <Location id={String(id)} />;
}
