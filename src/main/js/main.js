import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';

class App extends Component {
   render() {
      return (
         <Router>
            <div>
               <h2>Vote Application</h2>
               <ul>
                  <li><Link to={'/'}>Home</Link></li>
                
               </ul>
               <hr />
               
               <Switch>
                  <Route exact path='/' component={Home} />
                  
               </Switch>
            </div>
         </Router>
      );
   }
}
export default App;