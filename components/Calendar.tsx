import React, { JSX, useState, useEffect, useMemo, FC } from 'react';
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
    const [calendarView, setCalendarView] = useState<JSX.Element | null>(null);

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
        // REPLACED: Manual Intl logic with utility function
        // Determine "Today" in US Eastern Time to match site logic
        setTodayET(getEasternTimeISO());
    }, []);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = firstDay.getDay();
        
        const monthName = firstDay.toLocaleString('default', { month: 'long' });

        const rows: JSX.Element[] = [];
        let currentRow: JSX.Element[] = [];

        // Empty cells for padding start of month
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentRow.push(<td key={`empty-${i}`} className={styles.tableCell} />);
        }

        // We compare against the string YYYY-MM-DD in ET
        // to determine if a cell is in the future.
        for (let day = 1; day <= lastDay; day++) {
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const event = events[dateStr];
            
            // Simple string comparison works for ISO dates: "2025-11-26" > "2025-11-25"
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

            currentRow.push(
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

            if ((firstDayOfWeek + day) % 7 === 0 || day === lastDay) {
                // Fill remaining cells if last row
                if (day === lastDay && currentRow.length < 7) {
                    for (let k = currentRow.length; k < 7; k++) {
                        currentRow.push(<td key={`empty-end-${k}`} className={styles.tableCell} />);
                    }
                }
                rows.push(<tr key={`row-${day}`}>{currentRow}</tr>);
                currentRow = [];
            }
        }

        setCalendarView(
            <div className={styles.calendarContainer}>
                <div className={styles.calendarControls}>
                    <button onClick={prevMonth} className={styles.controlButton}>&larr; Prev</button>
                    <span className={styles.currentMonthLabel}>{monthName} {year}</span>
                    <button onClick={nextMonth} className={styles.controlButton}>Next &rarr;</button>
                </div>
                <table className={styles.calendarTable}>
                    <thead><tr>{dayHeaders}</tr></thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }, [currentDate, events, todayET, dayHeaders]);

    return <div className={styles.calendarWrapper}>{calendarView}</div>;
};

export default Calendar;
