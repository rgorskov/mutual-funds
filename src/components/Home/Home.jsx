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
import ojidPol from '../../utils/ozhPol';
import vzvPol from '../../utils/vzvPol';
import rangPol from '../../utils/rangPol';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            sourceData: [], // [{id, name, yieldByDays: [{ Date, Value }]]
            normalizedData: [], // [{id, name, values:[]}]
            workData: [], // [{id, name, kEval, kUsing, intervalLen, randomVar:[x,p, entryCount]}]
            alpha: 0.95,
            beta: 0.5,
            momentI: 2,
            intervalCount: null,
            risks: [], // [{id,name,varr,cvar,disp,sko,moment,stdMoment}]
            yields: [], // [{id,name,mo,ojid,vzv,rang}]
        };
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

    _createRisks(workData) {
        return workData.map((d) => {
            const varCvarValues = varCvar(d.randomVar, this.state.alpha),
                dispSkoValues = disperSKO(d.randomVar),
                momentsValues = moments(
                    d.randomVar,
                    mo(d.randomVar),
                    this.state.momentI
                );
            return {
                id: d.id,
                name: d.name,
                varr: varCvarValues.varr,
                cvar: varCvarValues.cvar,
                disp: dispSkoValues.disper,
                sko: dispSkoValues.sko,
                moment: momentsValues.moment,
                stdMoment: momentsValues.standMoment,
            };
        });
    }

    _createYields(workData) {
        return workData.map((d) => {
            return {
                id: d.id,
                name: d.name,
                mo: mo(d.randomVar),
                ojid: ojidPol(d.randomVar),
                vzv: vzvPol(d.randomVar),
                rang: rangPol(d.randomVar),
            };
        });
    }

    onSourceDataLoaded(sourceData) {
        const normalizedData = this._normalizeData(sourceData),
            workData = this._createWorkData(normalizedData);

        const risks = this._createRisks(workData),
            yields = this._createYields(workData);
        this.setState({
            sourceData,
            normalizedData,
            workData,
            initialized: true,
            risks,
            yields,
        });
        window.qqq = this.state;
    }

    onParamsChange({ alpha, beta, intervalCount, momentI }) {}

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
                            renderComponent={() => (
                                <SetUpParams
                                    alpha={this.state.alpha}
                                    beta={this.state.beta}
                                    intervalCount={this.state.intervalCount}
                                    momentI={this.state.momentI}
                                    onParamsChange={this.onParamsChange.bind(
                                        this
                                    )}
                                />
                            )}
                        />
                    )}
                />
                <Route
                    path="/risk"
                    render={() => (
                        <Page
                            initialized={this.state.initialized}
                            title="Оценка риска"
                            renderComponent={() => (
                                <Risk fundsRisks={this.state.risks} />
                            )}
                        />
                    )}
                />
                <Route
                    path="/yield"
                    render={() => (
                        <Page
                            initialized={this.state.initialized}
                            title="Оценка доходности"
                            renderComponent={() => (
                                <Yield fundsYields={this.state.yields} />
                            )}
                        />
                    )}
                />
                <Route
                    path="/bestchoice"
                    render={() => (
                        <Page
                            initialized={this.state.initialized}
                            title="Выбор наилучшего ПИФа"
                            renderComponent={() => (
                                <BestChoice
                                    risks={this.state.risks}
                                    yields={this.state.yields}
                                    beta={this.state.beta}
                                />
                            )}
                        />
                    )}
                />
                <Redirect exact from="/" to="/loaddata" />
            </>
        );
    }
}

export default Main;
