const ical = require('node-ical');

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
    let eventsToImport = [];
    for (const key in directEvents) {
        if (Object.hasOwnProperty.call(directEvents, key)) {
            const element = directEvents[key];
            let start = new Date(element.start).toJSON();
            let end = new Date(element.end).toJSON();

            let event = {
                title: element.summary,
                address: element.location,
                description: element.description,
                endTime: end,
                lat: null,
                lng: null,
                startTime: start,
            };
            eventsToImport.push(event);
        }
    }
    return eventsToImport;
}
