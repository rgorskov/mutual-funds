import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import Navigation from '../Navigation/Navigation';
import { Route, Redirect } from 'react-router-dom';
import LoadData from '../LoadData/LoadData';
import DataInfo from '../DataInfo/DataInfo';
import SetUpParams from '../SetUpParams/SetUpParams';
import Risk from '../Risk/RiskPage';
import Yield from '../Yield/Yield';
import BestChoice from '../BestChoicePage/BestChoicePage';
import Page from '../Page/Page';

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
                            render={() => (
                                <Page
                                    initialized={true}
                                    title="Исходные данные"
                                    renderComponent={() => <LoadData />}
                                />
                            )}
                        />
                        <Route
                            path="/datainfo"
                            render={() => (
                                <Page
                                    initialized={this.state.initialized}
                                    title="Обзор данных"
                                    renderComponent={() => <DataInfo />}
                                />
                            )}
                        />
                        <Route
                            path="/setupparams"
                            render={() => {
                                <Page
                                    initialized={this.state.initialized}
                                    title="Настройка параметров"
                                    renderComponent={() => <SetUpParams />}
                                />;
                            }}
                        />
                        <Route
                            path="/risk"
                            render={() => {
                                <Page
                                    initialized={this.state.initialized}
                                    title="Оценка риска"
                                    renderComponent={() => <Risk />}
                                />;
                            }}
                        />
                        <Route
                            path="/yield"
                            render={() => {
                                <Page
                                    initialized={this.state.initialized}
                                    title="Оценка доходности"
                                    renderComponent={() => <Yield />}
                                />;
                            }}
                        />
                        <Route
                            path="/bestchoice"
                            render={() => {
                                <Page
                                    initialized={this.state.initialized}
                                    title="Выбор наилучшего ПИФа"
                                    renderComponent={() => <BestChoice />}
                                />;
                            }}
                        />
                        <Redirect exact from="/" to="/loaddata" />
                    </main>
                </div>
            </div>
        );
    }
}

export default App;
