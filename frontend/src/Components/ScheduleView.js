import React, { useState, useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import OfflineMapPopup from './OfflineMapPopup';
import styles from '../Styles/ScheduleView.module.css';
import { AppContext } from '../helpers/AppContextProvider';
import { SidebarContext } from '../helpers/SidebarContextProvider';

export default function ScheduleView() {
    const { planName, APIkey } = useContext(AppContext);
    const { isOpen, setIsOpen } = useContext(SidebarContext);
    const [mapOpen, setMapOpen] = useState(false);
    const [mapLat, setMapLat] = useState();
    const [mapLong, setMapLong] = useState();
    const [events, setEvents] = useState([
        {
            id: 1,
            name: 'Event1',
            date: '04/04/2021',
            DateFrom: '17:00',
            DateTo: '17:00',
            weather: 'cloudy 24°C',
            location: 'Auckland',
            lat: '-36.8509',
            long: '174.7645',
        },
        {
            id: 2,
            name: 'Event2',
            date: '04/04/2021',
            DateFrom: '17:00',
            DateTo: '17:00',
            weather: 'cloudy 24°C',
            location: 'Auckland',
            lat: '-37.8509',
            long: '174.7645',
        },
        {
            id: 3,
            name: 'Event3',
            date: '04/04/2021',
            DateFrom: '17:00',
            DateTo: '17:00',
            weather: 'cloudy 24°C',
            location: 'Auckland',
            lat: '-35.8509',
            long: '174.7645',
        },
        {
            id: 4,
            name: 'Event4',
            date: '04/04/2021',
            DateFrom: '17:00',
            DateTo: '17:00',
            weather: 'cloudy 24°C',
            location: 'Auckland',
            lat: '-36.8509',
            long: '174.7645',
        },
    ]);

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

    if (planName) {
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
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell align="center">
                                        {event.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {event.date}
                                    </TableCell>
                                    <TableCell align="center">
                                        {event.DateFrom}-{event.DateTo}
                                    </TableCell>
                                    <TableCell align="center">
                                        {event.weather}
                                    </TableCell>
                                    <TableCell align="center">
                                        {event.location}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className={styles.map}
                                        onClick={handleOpen}
                                        lat={event.lat}
                                        long={event.long}
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
        return (
            <p className={styles.heading}>
                Please click on the plan which you want to view the events for
            </p>
        );
    }
}
