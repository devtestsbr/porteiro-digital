import { locations } from '@/mockGen';
import { mockFetchResolve, render, screen, waitFor } from '@/test/utils';
import { Home } from '.';

describe('<Home>', () => {
  const mock: locations = [
    ['mockId', 'mockName'],
    ['mockId2', 'mockName2'],
  ];

  beforeEach(async () => {
    mockFetchResolve(mock);

    render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('renders the page heading', async () => {
    expect(
      screen.getByRole('heading', { name: 'Locations' }),
    ).toBeInTheDocument();
  });

  it('renders two location buttons', async () => {
    expect(screen.getAllByRole('link')).toHaveLength(mock.length);
  });

  it('renders a button with link', async () => {
    expect(screen.getByRole('link', { name: mock[0][1] })).toHaveAttribute(
      'href',
      `/location/${mock[0][0]}`,
    );
  });
});
