const convertDateTime = (stringDT) => {
    const dt = new Date(stringDT);
    const datetime = new Date(stringDT).toISOString();
    const date = datetime.substring(0, 10);
    const time = datetime.substring(11, 19);

    const from24to12 = () => {
        let hour = parseInt(time.split(':')[0]);
        let format12, a, hh;

        if (hour >= 12) {
            format12 = hour - 12;
            a = 'P.M.';
        } else {
            format12 = hour;
            a = 'A.M.';
        }

        if (format12 === 0) format12 = 12;

        if (format12 < 10) {
            hh = `0${format12.toString()}`
        } else {
            hh = format12.toString()
        }

        return { hh: hh, a: a };
    }

    return {
        date: date,
        time: time,
        dd: date.split('-')[2],
        MM: date.split('-')[1],
        yyyy: date.split('-')[0],
        yy: date.split('-')[0].slice(2),
        HH: time.split(':')[0],
        hh: from24to12().hh,
        a: from24to12().a,
        mm: time.split(':')[1],
        ss: time.split(':')[2],
        fff: datetime.substring(20, 23),
    };
}

module.exports = convertDateTime;