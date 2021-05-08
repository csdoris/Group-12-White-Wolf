const ical = require('node-ical');
const geoCodingService = { current: null };

export default async function ImportICS() {
    let fileHandle;
    while (true) {
        try {
            [fileHandle] = await window.showOpenFilePicker();
            let extension = fileHandle.name.substring(
                fileHandle.name.lastIndexOf('.') + 1
            );
            if (extension === 'ics') {
                break;
            }
            alert('Pick an ICS file');
        } catch (err) {
            return;
        }
    }
    const file = await fileHandle.getFile();
    const contents = await file.text();
    let directEvents = ical.sync.parseICS(contents);
    if (Object.keys(directEvents).length == 0) {
        alert(
            "You don't have events in the file to import, or ics file is corrupted"
        );
        return null;
    }
    let eventsToImport = [];

    if (!geoCodingService.current && window.google) {
        geoCodingService.current = new window.google.maps.Geocoder();
    }

    for (const key in directEvents) {
        if (Object.hasOwnProperty.call(directEvents, key)) {
            const element = directEvents[key];
            let start = new Date(element.start).toJSON();
            let end = new Date(element.end).toJSON();
            await geoCoding(element.location, (results) => {
                console.log(results.geometry.location);
                let event = {
                    name: element.summary,
                    address: element.location,
                    description: element.description,
                    endTime: end,
                    lat: results.geometry.location.lat(),
                    lng: results.geometry.location.lng(),
                    startTime: start,
                };
                eventsToImport.push(event);
            });
        }
    }
    return eventsToImport;
}

const geoCoding = async (address, callback) => {
    await geoCodingService.current.geocode(
        { address: address },
        function (results, status) {
            if (status == 'OK') {
                callback(results[0]);
            } else {
                alert(
                    'Geocode was not successful for the following reason: ' +
                        status
                );
            }
        }
    );
};
