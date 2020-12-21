import React from 'react';
import s from './LoadData.module.scss';
import DataFromExcel from './DataFromExcel/DataFromExcel';
import DataPresentation from './DataPresentation/DataPresentation';

class LoadData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
        };
    }

    onSourceDataInitialize(sourceData) {
        this.setState({ sourceData });
    }

    render() {
        return (
            <div className={s.sourceDataWrapper}>
                <DataFromExcel
                    onSourceDataInitialize={this.onSourceDataInitialize.bind(
                        this
                    )}
                />
                {(() => {
                    if (this.state.sourceData.length) {
                        return (
                            <DataPresentation funds={this.state.sourceData} />
                        );
                    }
                })()}
            </div>
        );
    }
}

export default LoadData;
