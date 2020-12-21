import React from 'react';
import s from './Page.module.scss';

export default function ({ initialized, title, renderComponent }) {
    return (
        <div className={s.page}>
            <h1 className={s.title}>{title}</h1>
            {(() => {
                if (initialized) {
                    return renderComponent();
                } else {
                    return (
                        <div>
                            <p className={s.noDataMessage}>
                                <i className="fas fa-exclamation-triangle"></i>
                                <span>
                                    Для начала работы необходимо загрузить
                                    данные
                                </span>
                            </p>
                        </div>
                    );
                }
            })()}
        </div>
    );
}
