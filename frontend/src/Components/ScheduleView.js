import React, { useState, useEffect, useContext } from 'react';
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
    
    const { plans, APIkey } = useContext(AppContext);
    const { isOpen, setIsOpen, events, setEvents, planName } = useContext(SidebarContext);
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

    function parseDate(dateString) {
        let date = new Date(dateString)
        let string = `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
        // console.log(string);
        return string
    }

    function parseTime(dateString) {
        let date = new Date(dateString)
        let string = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        console.log();
        return string
    }

    if (events && events.length != 0) {
        return (
            <div>
                <div className={styles.heading}>
                    <h1>{planName}</h1>
                </div>
                <div
                    className={
                        isOpen ? styles.shiftTextRight : styles.shiftTextLeft
                    }
                >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <p className={styles.header}>Event Name</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className={styles.header}>Date</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p className={styles.header}>Time</p>
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
                            {events
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
                                    <TableRow key={event.id}>
                                        <TableCell align="center">
                                            {event.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {parseDate(event.startTime)} - {parseDate(event.endTime)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {parseTime(event.startTime)} - {parseTime(event.endTime)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.weather}
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
        if (events && events.length == 0) {
            return (
                <div>
                <div className={styles.heading}>
                    <h1>{planName}</h1>
                </div>
                <p className={styles.heading}>
                    You have no events for this plan, consider make one first
                </p>
                </div>
            );
        } else {
        return (
            <div>
            <div className={styles.heading}>
                    <h1>{planName}</h1>
                </div>
            <p className={styles.heading}>
                Please click on the plan which you want to view the events for
            </p>
            </div>
        );
    }
    }
}
