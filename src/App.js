import './assets/css/bootstrap-rtl.css';
import './assets/loading.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import http from './services/httpServices';
import About from './views/About.js';
import Error from './views/Error/Error.js';
import NotFound from './views/Error/NotFound.js';
import Home from './views/Home.js';
import Institute from './views/Institute.js';
import Search from './views/Search.js';
import Specialities from './views/Specialities';
import Statstics from './views/Statstics.js';
import Support from './views/Support.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      show: true,
    };
  }

  componentDidMount() {
    http.getToken().then(res => {
      localStorage.setItem('token', res.data.access_token);
      this.setState({ token: true, show: false });
    });
  }

  render() {
    const { token, show } = this.state;

    return (
      <div className="App">
        <div className={`div-container ${show ? 'show' : ''}`}>
          <div className="parent">
            <div className="spinner" />
          </div>
        </div>

        {token && (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/specialities/:target?/:id?" component={Specialities} />
            <Route path="/about" component={About} />
            <Route path="/support" component={Support} />
            <Route path="/institutions/:id?/:target?/:code?" component={Institute} />
            <Route path="/statistics" component={Statstics} />
            <Route path="/search" component={Search} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/error" component={Error} />
            <Redirect to="/notfound" from="*" />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
