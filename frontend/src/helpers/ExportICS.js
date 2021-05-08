const FileSaver = require('file-saver');
const ics = require('ics');

export default function ExportICS(events) {
    let eventsToExport = [];
    events.forEach((element) => {
        let start = new Date(element.startTime);
        let end = new Date(element.endTime);

        let newEvent = {
            title: element.name,
            start: [
                start.getFullYear(),
                start.getMonth() + 1,
                start.getDate(),
                start.getHours(),
                start.getMinutes(),
            ],
            end: [
                end.getFullYear(),
                end.getMonth() + 1,
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

    const { error, value } = ics.createEvents(eventsToExport);

    console.log(value);
    if (error || !value) {
        alert('No Events to export');
        return;
    }
    var blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'Plan.ics');
}
