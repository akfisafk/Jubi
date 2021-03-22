import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Pages/Home';
import { Categories } from './components/Pages/Categories';
import { Favorites } from './components/Pages/Favorites';
import { Error } from './components/Pages/Error';
import { Settings } from './components/Pages/Settings';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <>
        <Router>
          <Navbar />
          <div className="content">
            <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/all">
              <Categories />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route path="*">
              <Error />
            </Route>
            </Switch>
          </div>
        </Router>
    </>
  );
}

export default App;
