// components/Calendar.tsx
import React, { JSX, useState, useEffect, useMemo, FC } from 'react';
import styles from '../styles/Home.module.css';
import { EventData, Events } from '../types';

/**
 * Props for the Calendar component
 */
interface CalendarProps {
    /** Map of date strings (YYYY-MM-DD) to event data */
    events: Events;
    /** Callback fired when a date with an event is clicked */
    onDateSelect: (selected: { date: string; data: EventData }) => void;
}

/**
 * Internal representation of a calendar day
 */
interface CalendarDay {
    /** Day of month (1-31) */
    day: number;
    /** Full ISO date string (YYYY-MM-DD) */
    fullDate: string;
    /** Event data for this day */
    data: EventData;
}

/**
 * Interactive calendar component that displays golf events by month
 * Shows visual indicators for arrivals, departures, and golf days
 * Allows clicking on past events to view details
 */
const Calendar: FC<CalendarProps> = ({ events, onDateSelect }) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [calendarMonths, setCalendarMonths] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const dayHeaders = useMemo(() =>
        ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
            <th key={day}>{day}</th>
        )),
        []
    );

    useEffect(() => {
        if (hasMounted) {
            const generateCalendar = () => {
                const months: Record<string, CalendarDay[]> = {};
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                Object.keys(events).forEach(dateStr => {
                    const [yearStr, monthStr, dayStr] = dateStr.split('-');
                    const year = parseInt(yearStr, 10);
                    const month = parseInt(monthStr, 10);
                    const day = parseInt(dayStr, 10);

                    const localDate = new Date(year, month - 1, day);
                    const monthYear = `${localDate.getFullYear()}-${(localDate.getMonth() + 1).toString().padStart(2, '0')}`;

                    months[monthYear] ??= [];
                    months[monthYear].push({
                        day: localDate.getDate(),
                        fullDate: dateStr,
                        data: events[dateStr]
                    });
                });

                return Object.entries(months).map(([monthKey, days]) => {
                    const [year, month] = monthKey.split('-').map(Number);
                    const firstDay = new Date(year, month - 1, 1);
                    const firstDayOfWeek = firstDay.getDay();
                    const lastDay = new Date(year, month, 0).getDate();
                    const monthName = firstDay.toLocaleString('default', { month: 'long' });

                    const rows: JSX.Element[] = [];
                    let currentRow: JSX.Element[] = [];

                    // Empty cells
                    for (let i = 0; i < firstDayOfWeek; i++) {
                        currentRow.push(<td key={`empty-${i}`} className={styles.tableCell} />);
                    }

                    // Days
                    for (let day = 1; day <= lastDay; day++) {
                        const cellDate = new Date(year, month - 1, day);
                        cellDate.setHours(0, 0, 0, 0);
                        const isFuture = cellDate > today;
                        const eventDay = days.find(d => d.day === day);

                        let className = styles.tableCell;
                        let onClick: (() => void) | null = null;
                        let ariaLabel: string | undefined;

                        if (eventDay) {
                            const { type } = eventDay.data;

                            if (type === 'arrival' || type === 'golf_arrival') {
                                className += ` ${styles.arrivalDay}`;
                            }
                            if (type === 'departure' || type === 'golf_departure') {
                                className += ` ${styles.departureDay}`;
                            }
                            if (['golf', 'golf_arrival', 'golf_departure'].includes(type)) {
                                className += ` ${styles.eventDay}`;
                            }

                            if (!isFuture) {
                                onClick = () => onDateSelect({
                                    date: eventDay.fullDate,
                                    data: eventDay.data
                                });
                            }

                            ariaLabel = `${type} on ${eventDay.fullDate}`;
                        }

                        if (isFuture) {
                            className += ` ${styles.futureDay}`;
                            if (eventDay) {
                                className += ` ${styles.futureDayEvent}`;
                            }
                        }

                        currentRow.push(
                            <td
                                key={day}
                                className={className}
                                onClick={onClick || undefined}
                                aria-label={ariaLabel}
                                role={onClick ? 'button' : undefined}
                            >
                                {day}
                            </td>
                        );

                        if ((firstDayOfWeek + day) % 7 === 0 || day === lastDay) {
                            rows.push(<tr key={`row-${day}`}>{currentRow}</tr>);
                            currentRow = [];
                        }
                    }

                    return (
                        <div key={monthKey} className={styles.calendarContainer}>
                            <table className={styles.calendarTable}>
                                <caption><h3>{monthName} {year}</h3></caption>
                                <thead>
                                    <tr>
                                        {dayHeaders}
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </table>
                        </div>
                    );
                });
            };

            setCalendarMonths(generateCalendar());
        }
    }, [hasMounted, events, onDateSelect, dayHeaders]);


    return <div className={styles.calendar}>{calendarMonths}</div>;
};

export default Calendar;
