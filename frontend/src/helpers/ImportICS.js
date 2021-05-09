const ical = require('node-ical');
const geoCodingService = { current: null };

/**
 * Function imports events from an ics file
 * @returns a list of events
 */
export default async function ImportICS() {
    let fileHandle;
    while (true) {
        //Continually open the file upload popup for user to upload an ics file
        try {
            [fileHandle] = await window.showOpenFilePicker();
            let extension = fileHandle.name.substring(
                fileHandle.name.lastIndexOf('.') + 1
            );
            if (extension === 'ics') {
                //If user has uploaded a correct (ics) file type continue with logic
                break;
            }
            alert('Pick an ICS file'); //Else ask for an ics file again
        } catch (err) {
            return; //If user clicks cancel in the file upload popup the system returns and does nothing
        }
    }
    const file = await fileHandle.getFile(); //Retrieve file from the user's system
    let fileName = file.name;
    console.log(fileName)
    const contents = await file.text(); //Read the file
    let directEvents = ical.sync.parseICS(contents); //Convert the ics formated contents into key value pairs
    if (Object.keys(directEvents).length == 0) {
        //If the parsing returns an empty object, means something went wrong with the ics file
        alert(
            "You don't have events in the file to import, or ics file is corrupted"
        );
        return null;
    }
    let eventsToImport = [];

    if (!geoCodingService.current && window.google) {
        geoCodingService.current = new window.google.maps.Geocoder(); //Get Geocoder object from the window which has been loaded
    }

    //For each key/event in the uploaded ics file fetch the lat and lng by using the address of the event
    for (const key in directEvents) {
        if (Object.hasOwnProperty.call(directEvents, key)) {
            const element = directEvents[key];
            let start = new Date(element.start).toJSON();
            let end = new Date(element.end).toJSON();
            await geoCoding(element.location, (results) => {
                //Uses the geoCoding function to fetch lat and lng
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
    return eventsToImport, fileName;
}

/**
 * This function is a wrapper for the geocode function so that we can pass in a callback to obtain the results of the geocode function
 * @param {*} address
 * @param {*} callback
 */
const geoCoding = async (address, callback) => {
    await geoCodingService.current.geocode(
        { address: address },
        function (results, status) {
            if (status == 'OK') {
                callback(results[0]);
            } else if (status == 'INVALID_REQUEST') {
                alert('Could not find location of one or more of the events');
            } else {
                alert(
                    'Geocode was not successful for the following reason: ' +
                        status
                );
            }
        }
    );
};
