import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.scss';
import Navigation from '../Navigation/Navigation';

function App() {
  return (
    <div className="container-fluid g-0 h-100">
      <div className="h-100 d-flex">
        <aside className="nav">
          <Navigation />
        </aside>
        <main className="main flex-grow-1"></main>
      </div>
    </div>
  );
}

export default App;
