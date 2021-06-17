import { FC } from 'react';
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from '@material-ui/icons/Menu';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: FC<AppProps> = () => (
  <Router>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Container>
      <Typography variant={'h1'}>Welcome to Zero!</Typography>
    </Container>
  </Router>
);

export default App;
