'use strict';

const {
    logger,
    constants: {
        API_ENDPOINT,
        LIBELLE_WITH_LOCATION,
        INFO_WITH_LOCATION,
        FINAL_TEXT,
    },
    date
} = require('../utils');

const fetchTracking = async (trackingId, lang) => {
    let response;
    try {
        const res = await fetch(`${API_ENDPOINT}?lang=${lang || 'fr'}&listeNumerosLT=${trackingId}`, {
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'fr-FR,fr;q=0.6',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'sec-gpc': '1',
                // cookie: 'JSESSIONID_S2S=.tc-mchronoweb-NODE9',
                Referer: 'https://www.chronoshop2shop.fr/tracking/',
                'Referrer-Policy': 'origin-when-cross-origin'
            },
            body: null,
            method: 'GET'
        });

        if (res.ok) {
            response  = await res.json();
        } else {
            throw new Error('Bad Response');
        }
    } catch (error) {
        logger.error('fetch', error);
    }
    return response;
};

/**
 * getLocationFromEvent
 * @param {Object} event
 * @returns {String}
 */
const getLocationFromEvent = (event) => {
    const detail = (event.informationComplementaire || []).find(elem => INFO_WITH_LOCATION.includes(elem.nom));
    return (detail && detail.value) ? detail.value : undefined;
};

/**
 * mapResponse
 * @param {Object} responseRaw 
 * @returns {Object}
 */
const mapResponse = (responseRaw) => {
    const history = [];
    (responseRaw.etapes || []).forEach(step => {
        (step.evenementsDLE || []).forEach(event => {
            const text = (event.libelle || '').trim();
            history.push({
                datetime: date.toDate(event.date),
                text,
                location: LIBELLE_WITH_LOCATION.includes(text) ? responseRaw.relayName || getLocationFromEvent(event) : undefined,
            });
        });
    });

    const lastStep = history[history.length - 1] || {};
    const lastUpdated = lastStep.datetime;
    const currentStatus = lastStep.text;
    const isComplete = lastStep.text === FINAL_TEXT;

    const firstStep = history[0] || {};
    const created = firstStep.datetime;

    const duration = date.getDurationInDays(lastStep.datetime, firstStep.datetime);

    return {
        trackingId: responseRaw.numeroLT,
        currentStatus,
        duration,
        isComplete,
        lastUpdated,
        created,
        history,
    };
};

/**
 * getTracking
 * @param {String} trackingId
 * @returns {Array.<{currentStatus: String, duration: Number, isComplete: Boolean, lastUpdated: Date, created: Date, history: Array}>}
 */
 module.exports = async (trackingId) => {
    const trackingResponse = await fetchTracking(trackingId);
    if (!trackingResponse) {
        logger.error('No response');
        return;
    }

    return mapResponse(trackingResponse);
};
