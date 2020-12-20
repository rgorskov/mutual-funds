import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.scss';
import Navigation from '../Navigation/Navigation';
import { Route, Redirect } from 'react-router-dom';
import LoadDataPage from '../LoadDataPage/LoadDataPage';
import DataInfoPage from '../DataInfoPage/DataInfoPage';
import SetUpParamsPage from '../SetUpParamsPage/SetUpParamsPage';
import RiskPage from '../RiskPage/RiskPage';
import YieldPage from '../YieldPage/YieldPage';
import BestChoicePage from '../BestChoicePage/BestChoicePage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
        };
    }
    render() {
        return (
            <div className="container-fluid g-0 h-100">
                <div className="h-100 d-flex">
                    <aside className="nav">
                        <Navigation />
                    </aside>
                    <main className="main flex-grow-1">
                        <Route
                            path="/loaddata"
                            render={() => <LoadDataPage />}
                        />
                        <Route
                            path="/datainfo"
                            render={() => (
                                <DataInfoPage
                                    initialized={this.state.initialized}
                                />
                            )}
                        />
                        <Route
                            path="/setupparams"
                            render={() => <SetUpParamsPage />}
                        />
                        <Route
                            path="/risk"
                            render={() => (
                                <RiskPage
                                    initialized={this.state.initialized}
                                />
                            )}
                        />
                        <Route
                            path="/yield"
                            render={() => (
                                <YieldPage
                                    initialized={this.state.initialized}
                                />
                            )}
                        />
                        <Route
                            path="/bestchoice"
                            render={() => (
                                <BestChoicePage
                                    initialized={this.state.initialized}
                                />
                            )}
                        />
                        <Redirect exact from="/" to="/loaddata" />
                    </main>
                </div>
            </div>
        );
    }
}

export default App;
