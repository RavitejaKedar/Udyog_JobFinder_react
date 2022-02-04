import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import LoginPage from './components/LoginPage'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
