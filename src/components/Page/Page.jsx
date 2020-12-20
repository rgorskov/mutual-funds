import React from 'react';
import s from './Page.module.scss';

export default function ({ initialized, title, renderComponent }) {
    return (
        <div>
            <h1>{title}</h1>
            {(() => {
                if (initialized) {
                    return renderComponent();
                } else {
                    return (
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <h4 className={s.noDataMessage}>
                                Для начала работы необходимо загрузить данные
                            </h4>
                        </div>
                    );
                }
            })()}
        </div>
    );
}
