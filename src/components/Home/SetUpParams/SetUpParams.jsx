import React from 'react';

class SetUpParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            change: false,
            alpha: this.props.alpha,
            beta: this.props.beta,
            momentI: this.props.momentI,
            useSterges: this.props.intervalCount == null,
            intervalCount: this.props.intervalCount,
            defaultIntervalCountValue: 5,
        };
    }

    onApplyButtonClick() {
        this.props.onParamsChange({
            alpha: this.state.alpha,
            beta: this.state.beta,
            intervalCount: this.state.intervalCount,
            momentI: this.state.momentI,
        });
        this.setState({ change: false });
    }

    onUseStergesChange() {
        const useSterges = !this.state.useSterges;
        const intervalCount = useSterges
            ? null
            : this.state.defaultIntervalCountValue;
        this.setState({
            useSterges,
            intervalCount,
            change: this.checkChange({ intervalCount }),
        });
    }

    onIntervalCountChange(e) {
        this.setState({
            intervalCount: e.target.value,
            change: this.checkChange({ intervalCount: e.target.value }),
        });
    }

    onBetaChange(e) {
        this.setState({
            beta: e.target.value,
            change: this.checkChange({ beta: e.target.value }),
        });
    }

    onAlphaChange(alpha) {
        this.setState({ alpha: alpha, change: this.checkChange({ alpha }) });
    }

    onMomentIChange(e) {
        this.setState({
            momentI: e.target.value,
            change: this.checkChange({ momentI: e.target.value }),
        });
    }

    checkChange({
        alpha = this.state.alpha,
        beta = this.state.beta,
        momentI = this.state.momentI,
        intervalCount = this.state.intervalCount,
    }) {
        const change = !(
            alpha == this.props.alpha &&
            beta == this.props.beta &&
            momentI == this.props.momentI &&
            intervalCount == this.props.intervalCount
        );
        return change;
    }

    render() {
        return (
            <div>
                <div className="">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={this.onApplyButtonClick.bind(this)}
                        disabled={!this.state.change}
                    >
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
                                defaultChecked={this.state.useSterges}
                                onChange={this.onUseStergesChange.bind(this)}
                            />
                            <label htmlFor="useSterges">
                                Использовать критерий Стёрджеса
                            </label>
                        </div>
                        <div>
                            <label
                                htmlFor="intervalsCount"
                                className={
                                    this.state.useSterges
                                        ? 'form-label m-0 text-black-50'
                                        : 'form-label m-0'
                                }
                            >
                                Количество разбиений:{' '}
                                <span>
                                    {this.state.intervalCount ||
                                        this.state.defaultIntervalCountValue}
                                </span>
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                min="5"
                                max="25"
                                step="1"
                                id="intervalsCount"
                                value={
                                    this.state.intervalCount ||
                                    this.state.defaultIntervalCountValue
                                }
                                disabled={this.state.useSterges}
                                onChange={(e) => this.onIntervalCountChange(e)}
                            />
                        </div>
                    </div>
                    <div className="offset-2 col-xxl-3 my-5 py-5 d-flex flex-column justify-content-between">
                        <h5 className="mb-4">Отношение предпочтения</h5>
                        <div class="">
                            <label for="beta" class="form-label m-0">
                                Значение: <span>{this.state.beta}</span>
                            </label>
                            <input
                                type="range"
                                class="form-range"
                                min="0.1"
                                max="0.9"
                                step="0.1"
                                id="beta"
                                value={this.state.beta}
                                onChange={(e) => this.onBetaChange(e)}
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
                            {[0.99, 0.95, 0.9].map((a) => {
                                let className =
                                    a == this.state.alpha
                                        ? 'btn btn-primary'
                                        : 'btn btn-outline-primary';
                                return (
                                    <button
                                        className={className}
                                        onClick={() => this.onAlphaChange(a)}
                                    >
                                        {a}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="offset-2 col-xxl-3 my-5 py-5 d-flex flex-column justify-content-between">
                        <h5 className="mb-4">
                            Значение порядка для левостороннего и стандартного
                            левостороннего моментов
                        </h5>
                        <div class="">
                            <label for="momentI" class="form-label m-0">
                                Значение: <span>{this.state.momentI}</span>
                            </label>
                            <input
                                type="range"
                                class="form-range"
                                min="2"
                                max="10"
                                step="1"
                                id="momentI"
                                value={this.state.momentI}
                                onChange={(e) => this.onMomentIChange(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetUpParams;
