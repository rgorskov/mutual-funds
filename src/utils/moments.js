import Decimal from 'decimal.js';

const moment = (randomVar, mo, coeff) => {
    return randomVar.reduce((sumDec, rv) => {
        const subDec = Decimal(mo).sub(rv.x),
            zeroDec = new Decimal(0),
            pDec = new Decimal(rv.p);
        const argDec = subDec.comparedTo(zeroDec) > 0 ? subDec : zeroDec;
        return sumDec.plus(pDec.mul(argDec.pow(coeff)));
    }, new Decimal(0));
};

export default function (randomVar, mo, coeff) {
    const momentDecimal = moment(randomVar, mo, coeff);
    const standMomentDecimal = momentDecimal.pow(Decimal(1).div(coeff));
    return {
        moment: momentDecimal.toNumber(),
        standMoment: standMomentDecimal.toNumber(),
    };
}
