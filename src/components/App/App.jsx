import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.scss';
import Navigation from '../Navigation/Navigation';
import { Route } from 'react-router-dom';
import LoadData from '../LoadData/LoadData';
import DataInfo from '../DataInfo/DataInfo';
import SetUpParams from '../SetUpParams/SetUpParams';
import Risk from '../Risk/Risk';
import Yield from '../Yield/Yield';
import BestChoice from '../BestChoice/BestChoice';

function App() {
  return (
    <div className="container-fluid g-0 h-100">
      <div className="h-100 d-flex">
        <aside className="nav">
          <Navigation />
        </aside>
        <main className="main flex-grow-1">
          <Route path="/loaddata" component={LoadData} />
          <Route path="/datainfo" component={DataInfo} />
          <Route path="/setupparams" component={SetUpParams} />
          <Route path="/risk" component={Risk} />
          <Route path="/yield" component={Yield} />
          <Route path="/bestchoice" component={BestChoice} />
        </main>
      </div>
    </div>
  );
}

export default App;
