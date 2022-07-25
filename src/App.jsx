import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation';
import UserMessage from './components/UserMessage';
function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
      <UserMessage />
    </div>
  );
}

export default App;
