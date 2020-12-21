import React from 'react';
import s from './LoadData.module.scss';
import * as XLSX from 'xlsx';
import DataFromExcel from './DataFromExcel/DataFromExcel';

class LoadData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.sourceDataWrapper}>
                <div className={s.loadingControls}>
                    <DataFromExcel />
                </div>
            </div>
        );
    }
}

export default LoadData;
