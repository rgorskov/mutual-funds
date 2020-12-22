import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadData from './LoadData/LoadData';
import SetUpParams from './SetUpParams/SetUpParams';
import Risk from './Risk/Risk';
import Yield from './Yield/Yield';
import BestChoice from './BestChoice/BestChoice';
import Page from './Page/Page';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            sourceData: [],
            normilizedData: [],
        };
    }

    _normilizeData(notNormilizeData) {
        const res = notNormilizeData.map((d) => {
            const name = d.name,
                id = d.id;
            const onlyYields = d.yieldByDays
                .map((ybd) => ybd.Value)
                .sort((a, b) => a - b);
            const min = onlyYields[0],
                max = onlyYields[onlyYields.length - 1];

            const normilized = onlyYields.map((y) => (y - min) / (max - min));

            return { id, name, values: normilized };
        });
        return res;
    }

    onSourceDataLoaded(sourceData) {
        this.setState({
            sourceData,
            initialized: true,
            normilizedData: this._normilizeData(sourceData),
        });
        console.log(this.state.normilizedData);
    }

    render() {
        return (
            <>
                <Route
                    path="/loaddata"
                    render={() => (
                        <Page
                            initialized={true}
                            title="Исходные данные"
                            renderComponent={() => (
                                <LoadData
                                    onSourceDataLoaded={this.onSourceDataLoaded.bind(
                                        this
                                    )}
                                    sourceData={this.state.sourceData}
                                />
                            )}
                        />
                    )}
                />
                <Route
                    path="/setupparams"
                    render={() => (
                        <Page
                            initialized={this.state.initialized}
                            title="Настройка параметров"
                            renderComponent={() => <SetUpParams />}
                        />
                    )}
                />
                <Route
                    path="/risk"
                    render={() => (
                        <Page
                            initialized={this.state.initialized}
                            title="Оценка риска"
                            renderComponent={() => <Risk />}
                        />
                    )}
                />
                <Route
                    path="/yield"
                    render={() => (
                        <Page
                            initialized={this.state.initialized}
                            title="Оценка доходности"
                            renderComponent={() => <Yield />}
                        />
                    )}
                />
                <Route
                    path="/bestchoice"
                    render={() => (
                        <Page
                            initialized={this.state.initialized}
                            title="Выбор наилучшего ПИФа"
                            renderComponent={() => <BestChoice />}
                        />
                    )}
                />
                <Redirect exact from="/" to="/loaddata" />
            </>
        );
    }
}

export default Main;
