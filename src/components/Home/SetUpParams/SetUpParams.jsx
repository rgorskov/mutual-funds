import React from 'react';

class SetUpParams extends React.Component {
    render() {
        return (
            <div>
                <div className="">
                    <button className="btn btn-primary btn-sm">
                        Применить
                    </button>
                </div>
                <div className="row">
                    <div className="offset-2 col-xxl-3 my-5 py-5">
                        <h5 className="mb-4">
                            Количество разбиений интервального вариационного
                            ряда
                        </h5>
                        <div class="d-flex align-items-center mb-3">
                            <input
                                type="checkbox"
                                id="useSterges"
                                class="me-2 d-inline-block"
                            />
                            <label htmlFor="useSterges">
                                Использовать критерий Стёрджеса
                            </label>
                        </div>
                        <div>
                            <label for="intervalsCount" class="form-label m-0">
                                Количество разбиений: <span></span>
                            </label>
                            <input
                                type="range"
                                class="form-range"
                                min="5"
                                max="25"
                                step="1"
                                id="intervalsCount"
                            />
                        </div>
                    </div>
                    <div className="offset-2 col-xxl-3 my-5 py-5 d-flex flex-column justify-content-between">
                        <h5 className="mb-4">Отношение предпочтения</h5>
                        <div class="">
                            <label for="beta" class="form-label m-0">
                                Значение: <span></span>
                            </label>
                            <input
                                type="range"
                                class="form-range"
                                min="0.1"
                                max="0.9"
                                step="0.1"
                                id="beta"
                            />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div className="offset-2 col-xxl-3 my-5 py-5 d-flex flex-column justify-content-between">
                        <h5 className="mb-4">
                            Значение доверительной вероятности для критериев VaR
                            и CVaR
                        </h5>
                        <div className="btn-group d-flex">
                            <button className="btn btn-outline-primary">
                                0.99
                            </button>
                            <button className="btn btn-outline-primary">
                                0.95
                            </button>
                            <button className="btn btn-outline-primary">
                                0.9
                            </button>
                        </div>
                    </div>
                    <div className="offset-2 col-xxl-3 my-5 py-5 d-flex flex-column justify-content-between">
                        <h5 className="mb-4">
                            Значение порядка для левостороннего и стандартного
                            левостороннего моментов
                        </h5>
                        <div class="">
                            <label for="momentI" class="form-label m-0">
                                Значение: <span></span>
                            </label>
                            <input
                                type="range"
                                class="form-range"
                                min="2"
                                max="10"
                                step="1"
                                id="momentI"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetUpParams;
