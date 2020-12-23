import React from 'react';

function Risk({ fundsRisks }) {
    return (
        <div>
            <div className="table-responsive">
                <table className="table table-striped table-hover word-break-break-all">
                    <thead className="table-primary">
                        <tr>
                            <th></th>
                            <th>Дисперсия</th>
                            <th>СКО</th>
                            <th className="word-break-keep-all">VaR</th>
                            <th className="word-break-keep-all">CVaR</th>
                            <th>Левосторонний момент</th>
                            <th>Стандартный левосторонний момент</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundsRisks.map((r, i) => {
                            return (
                                <tr key={i}>
                                    <th>{r.name}</th>
                                    <td>{r.disp}</td>
                                    <td>{r.sko}</td>
                                    <td>{r.varr}</td>
                                    <td>{r.cvar}</td>
                                    <td>{r.moment}</td>
                                    <td>{r.stdMoment}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Risk;
