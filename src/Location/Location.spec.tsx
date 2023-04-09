import { getAptsResult } from '@/mockGen';
import { mockFetchResolve, render, screen, waitFor } from '@/test/utils';
import { Location } from '.';

describe('<Location>', () => {
  const mock: getAptsResult = {
    location: 'mock location',
    apt: [
      ['mockId', 'mockName'],
      ['mockId2', 'mockName2'],
    ],
  };

  beforeEach(() => {
    mockFetchResolve(mock);

    render(<Location id={'1'} />);
  });

  it('renders the location name', async () => {
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: RegExp(mock.location) }),
      ).toBeInTheDocument();
    });
  });

  it('renders on apartment button', async () => {
    await waitFor(() => {
      const aptButton = screen.getByText(mock.apt[0][1]);
      expect(aptButton).toBeInTheDocument();
      expect(aptButton).toHaveAttribute('href', `/apt/${mock.apt[0][0]}`);
    });
  });

  it('renders the go back button', async () => {
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /</ })).toBeInTheDocument();
    });
  });

  it('renders two apartment buttons', async () => {
    const goBackButton = 1;
    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(
        mock.apt.length + goBackButton,
      );
    });
  });
});
