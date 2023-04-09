import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export function mockFetchResolve<T = unknown>(value: T) {
  // @ts-ignore
  globalThis.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(value),
  });
}

const customRender = (ui: Parameters<typeof render>['0']) =>
  render(ui, { wrapper });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
