import React, { Component } from 'react';
import Contact from './Contact';
import Display from './Display';

class App extends Component {
  render() {
    return (
      <div>
        <p><b>Edit Contact</b></p>
        <Contact />
        <p><b>Display Contact</b></p>
        <Display />
      </div>
    );
  }
}
export default App;
