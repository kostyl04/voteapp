import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import SubjectPage from './pages/subject/Subject';
import PollPage from './pages/poll/Poll';

class App extends Component {
    render() {
        return (
            <Router>



                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/subjects' component={SubjectPage} />
                    <Route exact path='/polls' component={PollPage} />
                </Switch>

            </Router>
        );
    }
}
export default App;