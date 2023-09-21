import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '@components/NavBar';

function App() {
  return (
    <Router>
      <main
        className="relative md:bg-black/90 h-screen px-6 md:px-20 pt-5 md:pt-7 pb-14"
        style={{
          background:
            'url(https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg) 10% / cover no-repeat',
        }}>
        <NavBar />
      </main>
    </Router>
  );
}

export default App;
