import { cleanup, getByText, render, wait } from '@testing-library/react';
import React from 'react';
import ParkList from './ParkList';

describe('ParkList', () => {
  afterEach(() => {
    delete global['fetch'];
    cleanup();
  });

  it('should render successfully', async () => {
    global['fetch'] = jest.fn().mockResolvedValueOnce({
      json: () => ({
        message: 'my message'
      })
    });

    const { baseElement } = render(<ParkList parks={[]} />);
    await wait(() => getByText(baseElement, 'my message'));
  });
});
