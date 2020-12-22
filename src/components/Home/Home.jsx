import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadData from './LoadData/LoadData';
import SetUpParams from './SetUpParams/SetUpParams';
import Risk from './Risk/Risk';
import Yield from './Yield/Yield';
import BestChoice from './BestChoice/BestChoice';
import Page from './Page/Page';
import Decimal from 'decimal.js';
import disperSKO from '../../utils/disperSKO';
import mo from '../../utils/mo';
import moments from '../../utils/moments';
import varCvar from '../../utils/varCvar';
import ozhPol from '../../utils/ozhPol';
import vzvPol from '../../utils/vzvPol';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            sourceData: [], // [{id, name, yieldByDays: [{ Date, Value }]]
            normalizedData: [], // [{id, name, values:[]}]
            workData: [], // [{id, name, kEval, kUsing, intervalLen, randomVar:[x,p, entryCount]}]
            alpha: new Decimal(0.95),
            momentI: 2,
            globalK: null,
            risks: [],
            yields: [],
        };
        console.log(
            vzvPol(
                [
                    { x: 0.05, p: 0.00203 },
                    { x: 0.15, p: 0.004065 },
                    { x: 0.25, p: 0.018293 },
                    { x: 0.35, p: 0.044715 },
                    { x: 0.45, p: 0.245935 },
                    { x: 0.55, p: 0.477642 },
                    { x: 0.65, p: 0.166667 },
                    { x: 0.75, p: 0.030488 },
                    { x: 0.85, p: 0.00813 },
                    { x: 0.95, p: 0.002033 },
                ],
                0.99
            )
        );
    }

    _normalizeData(notNormalizeDataArr) {
        const res = notNormalizeDataArr.map(({ id, name, yieldByDays }) => {
            const onlyYields = yieldByDays
                .map((ybd) => new Decimal(ybd.Value))
                .sort((a, b) => a.sub(b).toNumber());

            const min = onlyYields[0],
                max = onlyYields[onlyYields.length - 1];

            const normalized = onlyYields.map((y) => {
                const ySubMin = y.sub(min),
                    maxSubMin = max.sub(min);
                const div = ySubMin.div(maxSubMin).toNumber();
                return div;
            });

            return { id, name, values: normalized };
        });
        console.log(res);

        return res;
    }

    _createWorkData(normalizedDataArr, defaultK = null) {
        const res = normalizedDataArr.map(({ id, name, values }) => {
            //1 + 3.22 * Math.log10(values.length);
            const kEval = Decimal(1)
                .plus(Decimal(3.22).mul(Decimal(values.length).log(10)))
                .toNumber();
            const kUsing = defaultK !== null ? defaultK : Math.ceil(kEval);
            const intervalLen = 1 / kUsing;
            const commonCount = values.length;
            let randomVar = [];

            for (
                let i = 1,
                    currX = new Decimal(0),
                    nextX = new Decimal(intervalLen);
                i <= kUsing;
                i++,
                    currX = currX.plus(intervalLen),
                    nextX = nextX.plus(intervalLen)
            ) {
                let entryCount = (i === kUsing
                    ? values.filter(
                          (v) => v >= currX.toNumber() && v <= nextX.toNumber()
                      )
                    : values.filter(
                          (v) => v >= currX.toNumber() && v < nextX.toNumber()
                      )
                ).length;

                let x = currX.plus(nextX).div(2),
                    p = entryCount / commonCount;

                randomVar = randomVar.concat({
                    x,
                    p,
                    entryCount,
                });
            }

            return { id, name, kEval, kUsing, intervalLen, randomVar };
        });
        console.log(res);
        return res;
    }

    onSourceDataLoaded(sourceData) {
        const normalizedData = this._normalizeData(sourceData),
            workData = this._createWorkData(normalizedData);
        this.setState({
            sourceData,
            normalizedData,
            workData,
            initialized: true,
        });
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
