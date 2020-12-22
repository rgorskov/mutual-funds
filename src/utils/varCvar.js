import Decimal from 'decimal.js';

const calculateVarDecimal = (randomVar, alpha) => {
    let probSumD = new Decimal(randomVar[0].p),
        xD = new Decimal(randomVar[0].x),
        alphaD = new Decimal(alpha);
    for (let i = 0; i < randomVar.length; i++) {
        let nextProbSumD = probSumD.plus(Decimal(randomVar[i].p)),
            nextXD = Decimal(randomVar[i].x);
        if (nextProbSumD.comparedTo(alphaD) > 0) {
            return xD;
        } else {
            probSumD = nextProbSumD;
            xD = nextXD;
        }
    }
};

const calculateCvarDecimal = (randomVar, varD) => {
    let mo = new Decimal(0);
    for (let i = 0; i < randomVar.length; i++) {
        let xiD = new Decimal(randomVar[i].x),
            piD = new Decimal(randomVar[i].p);
        if (xiD.comparedTo(varD) < 0) {
            mo = mo.plus(xiD.times(piD));
        } else {
            return mo;
        }
    }
};

export default function (randomVar, alpha) {
    const varD = calculateVarDecimal(randomVar, 1 - alpha);
    const cvarD = calculateCvarDecimal(randomVar, varD);
    return {
        varr: varD.toNumber(),
        cvar: cvarD.toNumber(),
    };
}
