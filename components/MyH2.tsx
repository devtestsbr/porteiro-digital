import React from 'react';

export function MyH2({ children }: { children: React.ReactNode }) {
  return <h2 className='text-lg font-semibold mb-4'>{children}</h2>;
}
