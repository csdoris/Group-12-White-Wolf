import React, { useState, useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from '../Styles/ScheduleView.module.css';
import { AppContext } from '../helpers/AppContextProvider';

export default function ScheduleView() {
    const { planName } = useContext(AppContext);
    const [events, setEvents] = useState([
        {
            id: 1,
            name: 'Event1',
            date: '04/04/2021',
            time: '17:00',
            weather: 'cloudy 24°C',
            location: 'Auckland',
            lat: '-36.8509',
            long: '174.7645',
        },
        {
            id: 2,
            name: 'Event2',
            date: '04/04/2021',
            time: '17:00',
            weather: 'cloudy 24°C',
            location: 'Auckland',
            lat: '-37.8509',
            long: '174.7645',
        },
        {
            id: 3,
            name: 'Event3',
            date: '04/04/2021',
            time: '17:00',
            weather: 'cloudy 24°C',
            location: 'Auckland',
            lat: '-35.8509',
            long: '174.7645',
        },
        {
            id: 4,
            name: 'Event4',
            date: '04/04/2021',
            time: '17:00',
            weather: 'cloudy 24°C',
            location: 'Auckland',
            lat: '-36.8509',
            long: '174.7645',
        },
    ]);

    if (planName) {
        return (
            <div>
                <div className={styles.heading}>
                    <h1>{planName}</h1>
                </div>
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
                                    {event.time}
                                </TableCell>
                                <TableCell align="center">
                                    {event.weather}
                                </TableCell>
                                <TableCell align="center">
                                    {event.location}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    } else {
        return (
            <p>
                Please click on the plan which you want to view the events for
            </p>
        );
    }
}
