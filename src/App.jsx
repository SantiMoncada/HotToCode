import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import AppRoutes from './routes/AppRoutes'

import SignupForm from './components/SignupForm'
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
      <h1>Hot to Code</h1>
      <SignupForm />
    </div>
  );
}

export default App;
