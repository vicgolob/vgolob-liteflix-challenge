import { BrowserRouter as Router } from 'react-router-dom';

import { SidePanelProvider } from '@context/Providers';
import Home from '@pages/Home';

function App() {
  return (
    <Router>
      <SidePanelProvider>
        <Home />
      </SidePanelProvider>
    </Router>
  );
}

export default App;
