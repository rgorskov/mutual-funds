import React from 'react';

function Yield({ fundsYields }) {
    return (
        <div>
            <div className="table-responsive">
                <table className="table table-striped table-hover word-break-break-all">
                    <thead class="table-primary">
                        <tr>
                            <th></th>
                            <th>Математическое ожидание</th>
                            <th>Ожидаемая полезность</th>
                            <th>Взвешенная полезность</th>
                            <th>Ранговая полезность</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundsYields.map((r, i) => {
                            return (
                                <tr key={i}>
                                    <th>{r.name}</th>
                                    <td>{r.mo}</td>
                                    <td>{r.ojid}</td>
                                    <td>{r.vzv}</td>
                                    <td>{r.rang}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Yield;
