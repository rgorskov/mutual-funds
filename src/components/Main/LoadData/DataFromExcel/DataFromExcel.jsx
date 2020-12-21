import React from 'react';
import * as XLSX from 'xlsx';

class DataFromExcel extends React.Component {
    constructor(props) {
        super(props);
    }

    onFileChange(file) {
        const readingExcel = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, {
                    type: 'buffer',
                    cellDates: true,
                });

                const dataByPages = wb.SheetNames.map((name, id) => {
                    const workSheet = wb.Sheets[name];

                    const res = {
                        id,
                        name,
                        data: XLSX.utils.sheet_to_json(workSheet),
                    };
                    return res;
                });
                resolve(dataByPages);
            };
            fileReader.onerror = (error) => reject(error);
        });

        readingExcel.then(this.props.onSourceDataInitialize).catch();
    }

    render() {
        return (
            <div class="btn-group">
                <label htmlFor="loadFile" class="btn btn-primary btn-sm">
                    Загрузить данные
                </label>
                <input
                    id="loadFile"
                    onChange={(e) => {
                        this.onFileChange(e.target.files[0]);
                    }}
                    class="d-none"
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
                <a
                    href={process.env.PUBLIC_URL + '/xlsx/EmptyTemplate.xlsx'}
                    className="btn btn-light btn-sm"
                >
                    Скачать шаблон
                </a>
                <a
                    href={process.env.PUBLIC_URL + '/xlsx/DataTemplate.xlsx'}
                    className="btn btn-light btn-sm"
                >
                    Скачать заполненный шаблон
                </a>
            </div>
        );
    }
}

export default DataFromExcel;
