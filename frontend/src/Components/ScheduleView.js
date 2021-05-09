import React, { useState, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import OfflineMapPopup from './OfflineMapPopup';
import styles from '../Styles/ScheduleView.module.css';
import { AppContext } from '../AppContextProvider';
import { SidebarContext } from '../helpers/SidebarContextProvider';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function ScheduleView() {

    const { APIkey, plan } = useContext(AppContext);
    const { isOpen, weatherInfo } = useContext(SidebarContext);
    const [mapOpen, setMapOpen] = useState(false);
    const [mapLat, setMapLat] = useState();
    const [mapLong, setMapLong] = useState();


    function handleClose() {
        setMapOpen(false);
    }

    function handleOpen(e) {
        setMapOpen(true);
        setMapLat(e.target.getAttribute('lat'));
        setMapLong(e.target.getAttribute('long'));
    }

    // TODO: handle view event or edit event in schedule view
    function handleOpenEvent(event) {
        console.log(event);
    }

    function urlBuilder() {
        let url = '';
        let API_KEY = APIkey;
        let lat = mapLat;
        let long = mapLong;
        let center = `${lat},${long}`;
        url = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=12&size=600x300&maptype=roadmap
		&markers=color:red%7C${lat},${long}&key=${API_KEY}`;
        return url;
    }

    function parseEventDuration(dateStartString, dateEndString) {
        let startDate = new Date(dateStartString);
        let endDate = new Date(dateEndString);

        let eventTime = "";
        // Format for same day event "D Month Year, HH:MM - HH:MM "
        if (startDate.toDateString() === endDate.toDateString()) {
            eventTime = `${parseDate(startDate)}, ${parseTime(startDate)} - ${parseTime(endDate)}`;
        } else {
            // Format for same day event "D Month Year, HH:MM - D Month Year, HH:MM "
            eventTime = `${parseDate(startDate)}, ${parseTime(startDate)} - ${parseDate(endDate)}, ${parseTime(endDate)}`;
        }

        return eventTime
    }

    function parseDateTime(dateString) {
        let date = new Date(dateString);

        return `${parseDate(date)} \n ${parseTime(date)}`;
    }

    function parseDate(dateObj) {
        return `${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]} ${dateObj.getFullYear()}`
    }

    function parseTime(dateObj) {
        return `${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, "0")}`
    }

    if (plan && plan.events.length !== 0) {
        return (
            <div className={isOpen ? styles.shiftTextRight : styles.shiftTextLeft}>
                <p>&nbsp;</p>
                <h1 className={styles.heading}>{plan.name}</h1>
                <div>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <p className={styles.header}>Event Name</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className={styles.header}>Start Time</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className={styles.header}>End Time</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className={styles.header}>Weather</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className={styles.header}>Location</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className={styles.header}>Offline Map</p>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*Sorts the events first on date then by time of day*/}
                            {plan.events
                                .sort((a, b) =>
                                    a.date > b.date
                                        ? 1
                                        : a.date === b.date
                                            ? a.DateFrom > b.DateFrom
                                                ? 1
                                                : -1
                                            : -1
                                )
                                .map((event) => (
                                    <TableRow key={event._id} hover>
                                        <TableCell align="center">
                                            {event.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {parseDateTime(event.startTime)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {parseDateTime(event.endTime)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {/* TODO: Improve css*/}
                                            {
                                                weatherInfo[event._id] &&
                                                <div>
                                                    <img style={{ height: 50}} src={`http://openweathermap.org/img/w/${weatherInfo[event._id].weatherIcon}.png`} />
                                                    <p>{weatherInfo[event._id].temperature}&#176;C</p>
                                                </div>
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.address}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className={styles.map}
                                            onClick={handleOpen}
                                            lat={event.lat}
                                            long={event.lng}
                                        >
                                            Click to open a map for this event
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <OfflineMapPopup
                        open={mapOpen}
                        handleClose={handleClose}
                        url={urlBuilder()}
                    />
                </div>
            </div>
        );
    } else {
        if (plan && plan.events.length === 0) {
            return (
                <div className={isOpen ? styles.shiftTextRight : styles.shiftTextLeft}>
                    <p>&nbsp;</p>
                    <h1 className={styles.heading}>{plan.name}</h1>
                    <p className={styles.heading}>
                        You have no events for this plan, please add an event
                </p>
                </div>
            );
        } else {
            return (
                <div className={isOpen ? styles.shiftTextRight : styles.shiftTextLeft}>
                    <p>&nbsp;</p>
                    <p className={styles.heading}>
                        Please click on the plan which you want to view the events for
                    </p>
                </div>
            );
        }
    }
}
