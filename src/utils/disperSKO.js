import Decimal from 'decimal.js';

const calculateDisperDecimal = (randomVar) => {
    const MOs = randomVar.reduce(
        ({ mo, mo2 }, rv) => {
            const x2p = Decimal(rv.x).pow(2).mul(rv.p),
                xp = Decimal(rv.x).mul(rv.p);
            return {
                mo: mo.plus(xp),
                mo2: mo2.plus(x2p),
            };
        },
        { mo: new Decimal(0), mo2: new Decimal(0) }
    );

    return MOs.mo2.sub(MOs.mo.pow(2));
};

export default function (randomVar) {
    const disper = calculateDisperDecimal(randomVar);
    const sko = disper.sqrt();
    return {
        disper: disper.toNumber(),
        sko: sko.toNumber(),
    };
}
