import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';

function App() {
    return (
        <div className="container-fluid g-0 h-100">
            <div className="h-100 d-flex">
                <aside className="nav">
                    <Navigation />
                </aside>
                <main className="main flex-grow-1">
                    <Home />
                </main>
            </div>
        </div>
    );
}

export default App;
