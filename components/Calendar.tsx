import React, { useState, useEffect, useMemo, useCallback, FC } from 'react';
import styles from '../styles/Home.module.css';
import { EventData, Events, isGolfEventType } from '../types';
import { getEasternTimeISO } from '../utils/dateHelpers';

interface CalendarProps {
    events: Events;
    onDateSelect: (selected: { date: string; data: EventData }) => void;
}

const Calendar: FC<CalendarProps> = ({ events, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [todayET, setTodayET] = useState<string>('');

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const dayHeaders = useMemo(() =>
        ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
            <th key={day}>{day}</th>
        )),
    []);

    useEffect(() => {
        setTodayET(getEasternTimeISO());
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDay.getDay();
    const monthName = firstDay.toLocaleString('default', { month: 'long' });

    // Single event handler using data attributes - avoids creating functions per day
    const handleDayClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const dateStr = e.currentTarget.dataset.date;
        if (dateStr && events[dateStr]) {
            onDateSelect({ date: dateStr, data: events[dateStr] });
        }
    }, [events, onDateSelect]);

    // Memoized styles for interactive buttons
    const buttonBaseStyle = useMemo(() => ({
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        color: 'inherit',
        font: 'inherit'
    }), []);

    // Memoize calendar rows to prevent unnecessary recalculations
    const calendarRows = useMemo(() => {
        const cells: React.ReactNode[] = [];

        // Empty cells for padding start of month
        for (let i = 0; i < firstDayOfWeek; i++) {
            cells.push(<td key={`empty-start-${i}`} className={styles.tableCell} />);
        }

        // Days of the month
        for (let day = 1; day <= lastDay; day++) {
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const event = events[dateStr];

            const isFuture = todayET ? dateStr > todayET : false;
            const isToday = dateStr === todayET;

            let className = styles.tableCell;

            if (event && isGolfEventType(event.type)) {
                className += ` ${styles.eventDay}`;
            }
            if (isFuture) className += ` ${styles.futureDay}`;
            if (isToday) className += ` ${styles.currentDay}`;

            // Use button for interactive elements, div for non-interactive
            cells.push(
                <td key={day} className={styles.cellWrapper}>
                    {event && !isFuture ? (
                         <button
                            className={className}
                            onClick={handleDayClick}
                            data-date={dateStr}
                            style={{
                                ...buttonBaseStyle,
                                border: isToday ? '1px solid var(--color-primary-orange)' : 'none',
                            }}
                            aria-label={`Select ${dateStr}`}
                         >
                            {day}
                         </button>
                    ) : (
                        <div
                            className={className}
                            style={{
                                border: isToday ? '1px solid var(--color-primary-orange)' : undefined
                            }}
                        >
                            {day}
                        </div>
                    )}
                </td>
            );
        }

        while (cells.length % 7 !== 0) {
            cells.push(<td key={`empty-end-${cells.length}`} className={styles.tableCell} />);
        }

        const rows: React.ReactNode[] = [];
        for (let i = 0; i < cells.length; i += 7) {
            rows.push(<tr key={`row-${i/7}`}>{cells.slice(i, i + 7)}</tr>);
        }

        return rows;
    }, [year, month, firstDayOfWeek, lastDay, todayET, events, handleDayClick, buttonBaseStyle]);

    return (
        <div className={styles.calendarWrapper}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarControls}>
                    <button onClick={prevMonth} className={styles.controlButton}>&larr; Prev</button>
                    <span className={styles.currentMonthLabel}>{monthName} {year}</span>
                    <button onClick={nextMonth} className={styles.controlButton}>Next &rarr;</button>
                </div>
                <table className={styles.calendarTable}>
                    <caption className="sr-only">Golf events calendar for {monthName} {year}</caption>
                    <thead><tr>{dayHeaders}</tr></thead>
                    <tbody>{calendarRows}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
