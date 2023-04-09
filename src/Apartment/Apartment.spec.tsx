import { getOneAptResult } from '@/mockGen';
import {
  mockFetchResolve,
  render,
  screen,
  userEvent,
  waitFor,
} from '@/test/utils';
import { Apartment } from '.';

describe('<Apartment>', () => {
  const mock: getOneAptResult = ['mockId', 'mockName'];
  const formFields = ['name', 'message', 'contact'];

  beforeEach(async () => {
    mockFetchResolve(mock);

    render(<Apartment id='1' />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('renders the go back button', async () => {
    expect(screen.getByRole('link', { name: /</ })).toBeInTheDocument();
  });

  it('renders the apartment name', async () => {
    expect(
      screen.getByRole('heading', { name: new RegExp(mock[1]) }),
    ).toBeInTheDocument();
  });

  it('renders "Leave a message"', async () => {
    expect(screen.getByText(/leave a message/i)).toBeInTheDocument();
  });

  it('renders the form inputs', async () => {
    formFields.forEach(field => {
      expect(
        screen.getByRole('textbox', { name: new RegExp(field, 'i') }),
      ).toBeInTheDocument();
    });
  });

  it('renders the send button disabled', async () => {
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  describe('on filling the form', () => {
    beforeEach(async () => {
      for (const field of formFields) {
        await userEvent.type(
          screen.getByLabelText(new RegExp(field, 'i')),
          `mock ${field}`,
        );
      }
    });

    it('enables the button', async () => {
      expect(screen.getByRole('button', { name: /send/i })).toBeEnabled();
    });

    describe('on sending the message', () => {
      it('shows "sending message"', async () => {
        userEvent.click(screen.getByRole('button', { name: /send/i }));
        await waitFor(() => {
          expect(screen.getByText(/sending message/i)).toBeInTheDocument();
        });
      });

      it('renders a send another message button disabled', async () => {
        userEvent.click(screen.getByRole('button', { name: /send/i }));
        await waitFor(() => {
          expect(
            screen.getByRole('button', { name: /send another/i }),
          ).toBeDisabled();
        });
      });

      describe('on finishing sending the message', () => {
        beforeEach(async () => {
          await userEvent.click(screen.getByRole('button', { name: /send/i }));
        });

        it('renders "message sent"', async () => {
          expect(screen.getByText(/message sent/i)).toBeInTheDocument();
        });

        it('renders the send another button enabled', async () => {
          expect(
            screen.getByRole('button', { name: /send another/i }),
          ).toBeEnabled();
        });
      });
    });
  });
});
