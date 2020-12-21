import React from 'react';
import * as XLSX from 'xlsx';

class DataFromExcel extends React.Component {
    constructor(props) {
        super(props);
    }

    loadFileHandler(file) {
        const readingExcel = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: 'buffer' });

                const dataByPages = wb.SheetNames.map((name) => {
                    const workSheet = wb.Sheets[name];
                    return {
                        name,
                        data: XLSX.utils.sheet_to_json(workSheet),
                    };
                });
                resolve(dataByPages);
            };
            fileReader.onerror = (error) => reject(error);
        });

        readingExcel.then().catch();
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
                        this.loadFileHandler(e.target.files[0]);
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
