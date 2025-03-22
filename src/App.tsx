import React from 'react';
import './App.css';
import TabContainer from './components/TabContainer';
import { AppBar, Container } from '@mui/material';

function App() {
  return (
    <div className="App main-container">
      {/* <AppBar position="static" color="default" sx={{ borderRadius: 2, boxShadow: 2 }}> */}
        <Container maxWidth="lg">
          <TabContainer />
        </Container>
      {/* </AppBar> */}
    </div>
  );
}

export default App;
