import React from 'react';
import s from './LoadData.module.scss';
import DataFromExcel from './DataFromExcel/DataFromExcel';
import DataPresentation from './DataPresentation/DataPresentation';

class LoadData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.sourceDataWrapper}>
                <DataFromExcel
                    onSourceDataInitialize={this.props.onSourceDataLoaded}
                />
                {(() => {
                    if (this.props.sourceData.length) {
                        return (
                            <DataPresentation funds={this.props.sourceData} />
                        );
                    }
                })()}
            </div>
        );
    }
}

export default LoadData;
