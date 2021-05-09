const FileSaver = require('file-saver');
const ics = require('ics');

/**
 * Function exports events that are passed in
 * @param {*} events 
 * @returns 
 */
export default function ExportICS(events) {
    let eventsToExport = [];
    events.forEach((element) => {
        let start = new Date(element.startTime);
        let end = new Date(element.endTime);

        let newEvent = {
            title: element.name,
            start: [ //In an array as per documentation of external package
                start.getFullYear(),
                start.getMonth() + 1, //Plus 1 since months start from zero
                start.getDate(),
                start.getHours(),
                start.getMinutes(),
            ],
            end: [ //In an array as per documentation of external package
                end.getFullYear(),
                end.getMonth() + 1, //Plus 1 since months start from zero
                end.getDate(),
                end.getHours(),
                end.getMinutes(),
            ],
            location: element.address,
            description: element.description,
            geo: { lat: element.lat, lon: element.lng },
        };

        eventsToExport.push(newEvent);
    });

    const { error, value } = ics.createEvents(eventsToExport); //Call external package function to turn list of objects to ICS text

    if (error || !value) { //If value is null means no events to export and alert user
        alert('No Events to export');
        return;
    }
    var blob = new Blob([value], { type: 'text/plain;charset=utf-8' }); //Finally downloads the ICS file
    FileSaver.saveAs(blob, 'Plan.ics'); //Prompt user for name and download location
}
