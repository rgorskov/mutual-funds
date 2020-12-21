import React from 'react';
import moment from 'moment';

class DataPresentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: 0,
        };
    }

    onChangeId(newId) {
        if (newId != this.state.currentId) {
            this.setState({ currentId: newId });
        }
    }

    render() {
        const chosenFundData = this.props.funds.find(
            (_, i) => i == this.state.currentId
        ).data;
        return (
            <div className="row mt-5">
                <div className="col-12 col-md-4 col-xl-3 col-xxl-2">
                    <div className="list-group">
                        {this.props.funds.map((fund, i) => {
                            const activeClass =
                                i == this.state.currentId ? ' active' : '';
                            return (
                                <button
                                    key={i}
                                    className={
                                        'list-group-item list-group-item-action' +
                                        activeClass
                                    }
                                    onClick={() => {
                                        this.onChangeId(i);
                                    }}
                                >
                                    {fund.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="col-12 col-md-8 col-xl-9 col-xxl-10">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Доходность</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chosenFundData.map((dataRow, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {moment(dataRow.Date).format(
                                                'DD.MM.YYYY'
                                            )}
                                        </td>
                                        <td>{dataRow.Value}</td>
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

export default DataPresentation;
