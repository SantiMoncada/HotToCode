
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation';
import UserMessage from './components/UserMessage';

import GlobalStyle from './globalStyles';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <AppRoutes />
      <UserMessage />
    </>
  );
}

export default App;
