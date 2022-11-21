'use strict';

/**
 * isTime
 * @param {String} str 10:54
 * @returns {Boolean}
 */
 const isTime = (str) => {
    if (!str) return false;

    const timePattern = /^(\d{2}):(\d{2})$/;
    return str &&
        str.length === 5 &&
        str.indexOf(':') === 2 &&
        str.match(timePattern);
};

/**
 * toDate
 * @param {String} dateRaw 08/11/2022
 * @returns {Date}
 */
 const toDate = (dateRaw) => {
    if (!dateRaw) {
        logger.error(`Missing param dateRaw`);
        return new Date();
    }

    const dateSplit = dateRaw.split(' ');
    const datePatternFull = /^(\d{2})\/(\d{2})\/(\d{4})\s(\d{1,2}):(\d{2})$/;
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    let date;
    try {
        if (isTime(dateSplit[2])) {
            const [, day, month, year, rawHour, min] = datePatternFull.exec(`${dateSplit[1]} ${dateSplit[2]}`);
            const hour = `${rawHour}`.length > 1 ? rawHour : `0${rawHour}`;
            date = new Date(`${year}-${month}-${day}T${hour}:${min}:00`);
        } else {
            const [, day, month, year] = datePattern.exec(dateRaw);
            date = new Date(`${month}, ${day} ${year}`);
        }
    } catch (error) {
        console.error(`Cannot extract date from string: ${dateRaw}`, error);
        date = new Date();
    }
    return date;
};

module.exports = {
    toDate,
};
