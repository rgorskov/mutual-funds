import Decimal from 'decimal.js';

const gamma = 0.69;

const calcgpD = (pD) => {
    const e1 = Decimal(Decimal(1).minus(pD)).pow(gamma);
    const e2 = pD.pow(gamma).plus(e1);
    const e3 = e2.pow(Decimal(1).div(gamma));

    // const _e1 = e1.toNumber(),
    //     _e2 = e2.toNumber(),
    //     _e3 = e3.toNumber();

    return Decimal(1).minus(e1.div(e3));
};

const calcuxD = (xD) => xD.pow(0.7);

const calcDArrSum = (arrD) =>
    arrD.reduce((sumD, a) => {
        return sumD.plus(a);
    }, new Decimal(0));

export default function (randomVar) {
    const xsD = randomVar.map((rv) => new Decimal(rv.x)),
        psD = randomVar.map((rv) => new Decimal(rv.p));
    let sumD = calcuxD(xsD[0]).plus(calcgpD(psD[0]));

    // const _xs = xsD.map((x) => x.toNumber()),
    //     _ps = psD.map((p) => p.toNumber());

    for (let i = 1; i < randomVar.length; i++) {
        let psFirstD = psD.slice(0, i + 1),
            psSecondD = psD.slice(0, i);

        // let _psFirst = _ps.slice(0, i + 1),
        //     _psSecond = _ps.slice(0, i);

        let psFDSum = calcDArrSum(psFirstD),
            psSDSum = calcDArrSum(psSecondD);

        // let _psFSum = psFDSum.toNumber(),
        //     _psSSum = psSDSum.toNumber();

        let gpFirst = calcgpD(psFDSum),
            gpSecond = calcgpD(psSDSum);

        // let _grFirst = gpFirst.toNumber(),
        //     _gpSecond = gpSecond.toNumber();

        let uxi = calcuxD(xsD[i]);

        // let _uxi = uxi.toNumber();

        sumD = sumD.plus(uxi.times(gpFirst.minus(gpSecond)));
    }

    return sumD.toNumber();
}
