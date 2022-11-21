'use strict';

//@see https://www.ditig.com/256-colors-cheat-sheet
const COLORS = {
    INFO: '78',
    DEBUG: '208',
    ERROR: '196'
};

module.exports = {
    API_ENDPOINT: 'https://www.chronoshop2shop.fr/tracking-ws-rest/tracking/suivi-colis-s2s',
    LIBELLE_WITH_LOCATION: [
        'Colis mis à disposition au point de retrait',
        'Destinataire informé par SMS ou mail',
        'Livraison effectuée',
        'Retiré par le destinataire',
    ],
    INFO_WITH_LOCATION: [
        'Identifiant point de retrait',
        'Point de livraison'
    ],
    FINAL_TEXT: 'Livraison effectuée',

    MILLISEC_IN_DAYS: 86400000,

    COLORS
};
