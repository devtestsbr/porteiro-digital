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

  beforeEach(async () => {
    mockFetchResolve(mock);

    render(<Location id={'1'} />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('renders the location name', async () => {
    expect(
      screen.getByRole('heading', { name: RegExp(mock.location) }),
    ).toBeInTheDocument();
  });

  it('renders on apartment button', async () => {
    const aptButton = screen.getByText(mock.apt[0][1]);
    expect(aptButton).toBeInTheDocument();
    expect(aptButton).toHaveAttribute('href', `/apt/${mock.apt[0][0]}`);
  });

  it('renders the go back button', async () => {
  expect(screen.getByRole('link', { name: /</ })).toBeInTheDocument();
  });

  it('renders two apartment buttons', async () => {
    const goBackButton = 1;
    expect(screen.getAllByRole('link')).toHaveLength(
      mock.apt.length + goBackButton,
    );
  });
});
