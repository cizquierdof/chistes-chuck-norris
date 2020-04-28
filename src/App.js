import React from 'react';
import ChuckNorris from './components/ChuckNorris';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RenderPDF from './components/RenderPDF';

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Route exact path='/' component={ChuckNorris}></Route>
        <Route exact path='/pdf' component={RenderPDF}></Route>
      </Router>
    </div>
  );
}

export default App;
