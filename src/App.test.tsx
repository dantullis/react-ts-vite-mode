import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import { App } from './App';

describe('App', () => {
  it('Renders Home page by default', () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Home Page');
  });

  it('Renders About page when navigating to /about', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('About Page');
  });

  it('Renders NotFound page for an unknown route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found');
  });
});
