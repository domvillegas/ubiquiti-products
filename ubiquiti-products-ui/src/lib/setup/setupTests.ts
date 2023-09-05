import React, { createContext } from 'react';
import '@testing-library/jest-dom/';
import '@testing-library/jest-dom';

//This mock is needed to work around a Jest bug involving Next's `Link` component
//https://github.com/vercel/next.js/issues/43769
//TODO: remove this mock when the linked bug (above) is resolved
jest.mock('next/dist/shared/lib/router-context.js', () => ({
  RouterContext: createContext(true),
}));
