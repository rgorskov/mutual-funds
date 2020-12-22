import Decimal from 'decimal.js';

export default function (randomVar) {
    return randomVar
        .reduce((sumDecimal, rv) => {
            const mul = Decimal(rv.p).times(Decimal(rv.x));
            return sumDecimal.plus(mul);
        }, new Decimal(0))
        .toNumber();
}
