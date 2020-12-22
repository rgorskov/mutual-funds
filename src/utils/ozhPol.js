import Decimal from 'decimal.js';

const utilityD = (x) => Decimal(x).pow(0.7);

export default function (randomVar) {
    return randomVar
        .reduce((moD, rv) => {
            const uxD = utilityD(rv.x),
                pD = new Decimal(rv.p);
            return moD.plus(uxD.times(pD));
        }, new Decimal(0))
        .toNumber();
}
