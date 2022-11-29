# Chronopost Tracking

<a href="https://packagephobia.now.sh/result?p=chronopost-tracking"><img src="https://badgen.net/packagephobia/install/chronopost-tracking" alt="Install size"></a>
<a href="https://www.npmjs.com/package/chronopost-tracking"><img src="https://img.shields.io/npm/v/chronopost-tracking" alt="npm version"></a>
<a href="https://security.snyk.io/package/npm/chronopost-tracking"><img src="https://snyk.io/test/npm/chronopost-tracking/badge.svg" alt="Known Vulnerabilities"></a>

Get package delivery tracking informations from Chronopost<br/>
<a href="https://www.chronopost.fr/"><img src="https://www.chronopost.fr/sites/all/themes/chronopost/images/chronopost_logo.png" alt="Chronopost" width="100"></a>

## Installation

In your application root directory, enter this command to install the connector:
```bash
npm install chronopost-tracking --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

## Method available

### getTracking
Returns everything in one object
```js
const tracking = require('chronopost-tracking');

// Using Promise
tracking.getTracking('XV297889338KL').then(tracking => {
    console.log(tracking);
});

// Using async/await
console.log(await tracking.getTracking('XV297889338KL'));
/*
{
    trackingId: 'XV297889338KL',
    currentStatus: "Livraison effectuée",
    duration: 4,
    isComplete: true,
    lastDate: "2022-06-03T16:23:00.000Z",
    startDate: "2022-05-31T03:08:00.000Z",
    history: [{
        datetime: "2022-05-31T03:08:00.000Z",
        text: "Colis en cours de préparation chez l'expéditeur",
        location: undefined
    }, {
        datetime: "2022-06-03T09:45:00.000Z",
        text: 'Prise en charge de votre colis sur notre site logistique de HUB LYON.',
        location: 'HUB LYON'
    }, {
        datetime: "2022-06-03T05:05:00.000Z",
        text: "Tri effectué dans l'agence de distribution",
        location: undefined
    }, {
        datetime: "2022-06-03T09:42:00.000Z",
        text: 'Colis en cours de livraison au point de retrait',
        location: undefined
    }, {
        datetime: "2022-06-03T16:23:00.000Z",
        text: "Livraison effectuée",
        location: 'DIJON'
    }]
}
*/
```
