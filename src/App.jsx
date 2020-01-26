import React from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import Games from "./components/Games";
import Game from "./components/Game";
import Stream from "./components/Stream";
import Streams from "./components/Streams";
import Home from "./components/Home";

function App() {

    return(
        <Router>
            <div>
                <nav className="nav">
                    <NavLink className="nav__link" activeClassName="active" exact to="/">Home</NavLink>
                    <NavLink className="nav__link" activeClassName="active" to="/games">Games</NavLink>
                    <NavLink className="nav__link" activeClassName="active" to="/streams">Streams</NavLink>
                </nav>

                {/* Using react router to render different components when clicking right link */}
                <Switch>
                    <Route path="/games/:id" component={Game} />           
                    <Route path="/games" component={Games} />
                    <Route path="/streams/:id" component={Stream} />
                    <Route path="/streams" component={Streams} />
                    {/* home has to be last because jsx runs in order, if it'll be first it'll take action and skip others */}
                    <Route path="/" component={Home} />>
                </Switch>
            </div>            
        </Router>
        
    )
};

export default App;