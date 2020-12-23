import React from 'react';
import Decimal from 'decimal.js';

class BestChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            riskMeasures: [
                { name: 'disp', title: 'Дисперсия' },
                { name: 'sko', title: 'СКО' },
                { name: 'varr', title: 'VaR' },
                { name: 'cvar', title: 'CVaR' },
                { name: 'moment', title: 'Левосторонний момент' },
                {
                    name: 'stdMoment',
                    title: 'Стандартный левосторонний момент',
                },
            ],
            yieldMeasures: [
                { name: 'mo', title: 'Математическое ожидание' },
                { name: 'ojid', title: 'Ожидаемая полезность' },
                { name: 'vzv', title: 'Взвешенная полезность' },
                { name: 'rang', title: 'Ранговая полезность' },
            ],
            activeRisk: 'disp',
            activeYield: 'mo',
            rangeByCriteria: [],
        };
    }

    componentDidMount() {
        this.setState({
            rangeByCriteria: this.createRage(
                this.state.activeRisk,
                this.state.activeYield
            ),
        });
    }

    createRage(activeRisk, activeYield) {
        let risks = this.props.risks.map((r) => ({
                id: r.id,
                name: r.name,
                value: r[activeRisk],
            })),
            yields = this.props.yields.map((r) => ({
                id: r.id,
                name: r.name,
                value: r[activeYield],
            }));
        let riskYield = risks.map((r, i) => {
            let y = yields[i];
            if (r.id != y.id) {
                y = yields.find((yd) => yd.id == r.id);
            }
            let criteriaD = Decimal(this.props.beta)
                .times(y.value)
                .minus(
                    Decimal(Decimal(1).minus(this.props.beta)).times(r.value)
                );
            return {
                name: r.name,
                criteria: criteriaD.toNumber(),
            };
        });

        return riskYield.sort((a, b) =>
            Decimal(b.criteria).comparedTo(Decimal(a.criteria))
        );
    }

    onRiskChange(name) {
        this.setState({
            activeRisk: name,
            rangeByCriteria: this.createRage(name, this.state.activeYield),
        });
    }

    onYieldChange(name) {
        this.setState({
            activeYield: name,
            rangeByCriteria: this.createRage(this.state.activeRisk, name),
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <h5 className="mb-4">Меры риска</h5>
                    <div className="list-group">
                        {this.state.riskMeasures.map((r, i) => {
                            const activeClass =
                                r.name === this.state.activeRisk
                                    ? ' list-group-item-secondary fw-bold'
                                    : '';
                            return (
                                <button
                                    key={i}
                                    className={
                                        'list-group-item list-group-item-action' +
                                        activeClass
                                    }
                                    onClick={() => {
                                        this.onRiskChange(r.name);
                                    }}
                                >
                                    {r.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="col-3">
                    <h5 className="mb-4">Меры доходности</h5>
                    <div className="list-group">
                        {this.state.yieldMeasures.map((y, i) => {
                            const activeClass =
                                y.name === this.state.activeYield
                                    ? ' list-group-item-secondary fw-bold'
                                    : '';
                            return (
                                <button
                                    key={i}
                                    className={
                                        'list-group-item list-group-item-action' +
                                        activeClass
                                    }
                                    onClick={() => {
                                        this.onYieldChange(y.name);
                                    }}
                                >
                                    {y.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="col-6">
                    <h5 className="mb-4">Результат</h5>
                    <table className="table">
                        <thead className="table-primary">
                            <tr>
                                <th>#</th>
                                <th>ПИФ</th>
                                <th>Значение критерия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.rangeByCriteria.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.criteria}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default BestChoice;
