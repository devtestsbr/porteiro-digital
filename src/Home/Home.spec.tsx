import { locations } from '@/mockGen';
import { mockFetchResolve, render, screen, waitFor } from '@/test/utils';
import { Home } from '.';

describe('<Location>', () => {
  const mock: locations = [
    ['mockId', 'mockName'],
    ['mockId2', 'mockName2'],
  ];

  beforeEach(() => {
    mockFetchResolve(mock);

    render(<Home />);
  });

  it('renders the page heading', async () => {
    await waitFor(() => {
      screen.getByRole('heading', { name: 'Locations' });
    });
  });

  it('renders two location buttons', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(mock.length);
    });
  });

  it('renders a button with link', async () => {
    await waitFor(() => {
      expect(screen.getByRole('link', { name: mock[0][1] })).toHaveAttribute(
        'href',
        `/location/${mock[0][0]}`,
      );
    });
  });
});
