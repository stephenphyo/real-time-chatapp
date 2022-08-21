
/*
    The Date() object specifies the number of milliseconds that have elapsed since the ECMAScript epoch, which is defined as "January 1, 1970, UTC"
*/

/*
    The getTimezoneOffset() method returns the difference, in MINUTES, between a date as evaluated in the UTC time zone, and the same date as evaluated in the local time zone.
    The offset is positive if the local timezone is behind UTC and negative if it is ahead.
*/

const getDateTimeInLocalTimeZone = () => {
    const current = new Date().getTime();   // milliseconds
    const timezoneOffset = new Date().getTimezoneOffset(); // minutes

    return new Date(current - timezoneOffset * 60 * 1000).toISOString();
};

module.exports = getDateTimeInLocalTimeZone;