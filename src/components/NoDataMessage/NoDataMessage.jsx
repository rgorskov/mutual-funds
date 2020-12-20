import React from 'react';
import s from './NoDataMessage.module.scss';

export default function () {
    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <h4 className={s.text}>
                Для начала работы необходимо загрузить данные
            </h4>
        </div>
    );
}
