import { getAptsResult } from '@/mockGen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { Location } from '.';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

function mockFetchResolve<T = unknown>(value: T) {
  // @ts-ignore
  globalThis.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(value),
  });
}

describe('Name of the group', () => {
  it('should ', async () => {
    const mock: getAptsResult = {
      location: 'mock location',
      apt: [['mockId', 'mockName']],
    };
    mockFetchResolve(mock);

    render(<Location id={'1'} />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(mock.location)).toBeInTheDocument();
    });

    const aptButton = screen.getByText(mock.apt[0][1]);
    expect(aptButton).toBeInTheDocument();
    expect(aptButton).toHaveAttribute('href', `/apt/${mock.apt[0][0]}`);
  });
});
