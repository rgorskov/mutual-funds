import Decimal from 'decimal.js';

const a = 1,
    b = 1;

const calcwxD = (x) => {
    const q = Decimal(2).times(a).times(x),
        p = Decimal(a).times(Decimal(x).pow(2));
    return q.minus(p);
};

const calcvxD = (x) => {
    const l = Decimal(b).times(Decimal(x).pow(2)),
        s = Decimal(2).times(b).times(x),
        d = Decimal(2).times(b);
    return l.minus(s).plus(d);
};

export default function (randomVar) {
    const MOs = randomVar.reduce(
        ({ wD, vD }, rv) => {
            const wxiD = calcwxD(rv.x),
                vxiD = calcvxD(rv.x),
                piD = new Decimal(rv.p);
            return {
                wD: wD.plus(wxiD.times(piD)),
                vD: vD.plus(vxiD.times(piD)),
            };
        },
        { wD: new Decimal(0), vD: new Decimal(0) }
    );
    return MOs.wD.dividedBy(MOs.vD).toNumber();
}
