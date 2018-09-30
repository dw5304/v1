import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Map from './Map'
import ButtonAppBar from './ButtonAppBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <ButtonAppBar/>
          <Map/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, '')(App);
