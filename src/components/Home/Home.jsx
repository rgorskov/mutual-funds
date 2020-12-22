import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadData from './LoadData/LoadData';
import SetUpParams from './SetUpParams/SetUpParams';
import Risk from './Risk/Risk';
import Yield from './Yield/Yield';
import BestChoice from './BestChoice/BestChoice';
import Page from './Page/Page';

const _ACCURACY_CONST = 100000;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            sourceData: [], // [{id, name, yieldByDays: [{ Date, Value }]]
            normilizedData: [], // [{id, name, values:[]}]
            workData: [], // [{id, name, kEval, kUsing, intervalLen, randomVar:[x,p, entryCount]}]
        };
    }

    _normilizeData(notNormilizeDataArr) {
        const res = notNormilizeDataArr.map(({ id, name, yieldByDays }) => {
            const onlyYields = yieldByDays
                .map((ybd) => Math.round(ybd.Value * _ACCURACY_CONST))
                .sort((a, b) => a - b);
            const min = onlyYields[0],
                max = onlyYields[onlyYields.length - 1];

            const normilized = onlyYields.map((y) => {
                const div = (y - min) / (max - min);
                return Math.round(div * _ACCURACY_CONST);
            });

            return { id, name, values: normilized };
        });
        console.log(res);
        return res;
    }

    _createWorkData(normilizedDataArr) {
        const res = normilizedDataArr.map(({ id, name, values }) => {
            const kEval = 1 + 3.22 * Math.log10(values.length);
            const kUsing = Math.ceil(kEval);
            const intervalLen = _ACCURACY_CONST / kUsing;
            const commonCount = values.length;
            let randomVar = [];

            for (
                let i = 1, currX = 0, nextX = intervalLen;
                i <= kUsing;
                i++, currX += intervalLen, nextX += intervalLen
            ) {
                let entryCount = (i === kUsing
                    ? values.filter((v) => v >= currX && v <= nextX)
                    : values.filter((v) => v >= currX && v < nextX)
                ).length;

                let _x = (currX + nextX) / 2,
                    p = entryCount / commonCount;
                let x = _x / _ACCURACY_CONST,
                    _p = Math.round(_ACCURACY_CONST * p);

                randomVar = randomVar.concat({
                    x,
                    p,
                    _x,
                    _p,
                    entryCount,
                });
            }

            return { id, name, kEval, kUsing, intervalLen, randomVar };
        });
        console.log(res);
        return res;
    }

    onSourceDataLoaded(sourceData) {
        this.setState({
            sourceData,
            initialized: true,
            normilizedData: this._normilizeData(sourceData),
        });
        this._createWorkData(this.state.normilizedData);
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
