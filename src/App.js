import React, { Component } from 'react';
import './App.css';
import data from './data.json';

// Take some data loaded from json file, and put it in a convenient format
const addresses = data.map((entry) => {
    const attr = entry['attributes'];
    const addr = attr['Address_Range'];
    const start = addr.substring(0, addr.indexOf('-'))
    const end = addr.substring(addr.indexOf('-') + 1, addr.indexOf(' '));
    const restAddress = addr.substring(addr.indexOf(' ') + 1) + ', Houston, TX';

    return {
        address: {
            start: start + ' ' + restAddress,
            end: end + ' ' + restAddress,
            original: addr
        },
        offense: attr['Offense']
    };
});

class App extends Component {
    render() {
        const width = 300;
        const height = 360;
        let baseSrc = 'https://maps.googleapis.com/maps/api/staticmap?size=' + width + 'x' + height;

        // You can add extra parameters like so
        baseSrc += '&maptype=satellite';
        // baseSrc += '&zoom=19';

        // The API docs recommend using an API key. You can get one from the Google developer console
        // This is a default key you can use, but will stop working daily after 25,000 queries
        const key = 'AIzaSyBlL_VZVFMr_KCPk1dQMUucXrrSepW-vW0';
        if (key.length > 0) {
            baseSrc += '&key=' + key;
        }

        const rows = [];
        let filteredAddresses = addresses.slice(0, 40);
        // filteredAddresses = addresses.filter(addr => addr['offense'] === 'Murder');

        filteredAddresses.forEach((info) => {
            const original = info.address.original;
            const offense = info.offense.charAt(0);
            let imageSrc = baseSrc;
            imageSrc += '&markers=color:red|label:' + offense + '|' + info.address.start;
            imageSrc += '&markers=color:red|label:' + offense + '|' + info.address.end;

            rows.push(<tr><td>{original}</td><td><img src={imageSrc} /></td></tr>);
        });

        return (
            <div className="App">
                <table>{rows}</table>
            </div>
        );
    }
}

export default App;
