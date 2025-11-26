import React, { useState, useEffect, useMemo, FC } from 'react';
import styles from '../styles/Home.module.css';
import { EventData, Events } from '../types';
import { getEasternTimeISO } from '../utils/dateHelpers';

interface CalendarProps {
    events: Events;
    onDateSelect: (selected: { date: string; data: EventData }) => void;
}

const Calendar: FC<CalendarProps> = ({ events, onDateSelect }) => {
    // Initialize with a date
    const [currentDate, setCurrentDate] = useState(new Date()); 
    const [todayET, setTodayET] = useState<string>(''); // Store "YYYY-MM-DD" in ET

    // Helpers to navigate months
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
        // Determine "Today" in US Eastern Time on the client side only
        // to avoid hydration mismatch with server rendering
        setTodayET(getEasternTimeISO());
    }, []);

    // Render Logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDay.getDay();
    const monthName = firstDay.toLocaleString('default', { month: 'long' });

    const renderCalendarCells = () => {
        const cells: React.ReactNode[] = [];

        // Empty cells for padding start of month
        for (let i = 0; i < firstDayOfWeek; i++) {
            cells.push(<td key={`empty-start-${i}`} className={styles.tableCell} />);
        }

        // Days of the month
        for (let day = 1; day <= lastDay; day++) {
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const event = events[dateStr];
            
            // Simple string comparison for ISO dates
            const isFuture = todayET ? dateStr > todayET : false;
            const isToday = dateStr === todayET;

            let className = styles.tableCell;
            let onClick: (() => void) | null = null;

            if (event) {
                if (['golf', 'golf_arrival', 'golf_departure'].includes(event.type)) {
                    className += ` ${styles.eventDay}`;
                }
                if (!isFuture) {
                    onClick = () => onDateSelect({ date: dateStr, data: event });
                }
            }

            if (isFuture) className += ` ${styles.futureDay}`;
            if (isToday) className += ` ${styles.currentDay}`;

            cells.push(
                <td
                    key={day}
                    className={className}
                    onClick={onClick || undefined}
                    style={{ 
                        cursor: onClick ? 'pointer' : 'default',
                        border: isToday ? '1px solid var(--color-primary-orange)' : undefined 
                    }}
                >
                    {day}
                </td>
            );
        }

        // Fill remaining cells to complete the last row
        while (cells.length % 7 !== 0) {
            cells.push(<td key={`empty-end-${cells.length}`} className={styles.tableCell} />);
        }

        // Group into rows
        const rows: React.ReactNode[] = [];
        for (let i = 0; i < cells.length; i += 7) {
            rows.push(<tr key={`row-${i/7}`}>{cells.slice(i, i + 7)}</tr>);
        }

        return rows;
    };

    return (
        <div className={styles.calendarWrapper}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarControls}>
                    <button onClick={prevMonth} className={styles.controlButton}>&larr; Prev</button>
                    <span className={styles.currentMonthLabel}>{monthName} {year}</span>
                    <button onClick={nextMonth} className={styles.controlButton}>Next &rarr;</button>
                </div>
                <table className={styles.calendarTable}>
                    <thead><tr>{dayHeaders}</tr></thead>
                    <tbody>{renderCalendarCells()}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
