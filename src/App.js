import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Top10 from './components/Top10';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Watchlist from './components/Watchlist';
import Details from './components/Details';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{ marginTop: 75 }}>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/Top10" component={Top10} />
            <Route exact path="/watchlist" component={Watchlist} />
            <Route exact path="/details" component={Details} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
