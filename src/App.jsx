import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import AppRoutes from './routes/AppRoutes'
import SnippetDetailsPage from './pages/SnippetDetailsPage'
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
      {/* <SnippetDetailsPage /> */}
    </div>
  );
}

export default App;
