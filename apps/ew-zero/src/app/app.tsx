import React from 'react';

import styled from '@emotion/styled';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to Energy Web Foundation Zero project!</h1>
      </header>
    </StyledApp>
  );
}

export default App;
