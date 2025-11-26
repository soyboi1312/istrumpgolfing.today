// components/Calendar.tsx
import React, { JSX, useState, useEffect, useMemo, FC } from 'react';
import styles from '../styles/Home.module.css';
import { EventData, Events } from '../types';

interface CalendarProps {
    events: Events;
    onDateSelect: (selected: { date: string; data: EventData }) => void;
}

const Calendar: FC<CalendarProps> = ({ events, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
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
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = firstDay.getDay();
        
        const monthName = firstDay.toLocaleString('default', { month: 'long' });
        const monthKey = `${year}-${(month + 1).toString().padStart(2, '0')}`;

        const rows: JSX.Element[] = [];
        let currentRow: JSX.Element[] = [];

        // Empty cells for padding start of month
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentRow.push(<td key={`empty-${i}`} className={styles.tableCell} />);
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        for (let day = 1; day <= lastDay; day++) {
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const cellDate = new Date(year, month, day);
            const event = events[dateStr];
            const isFuture = cellDate > today;

            let className = styles.tableCell;
            let onClick: (() => void) | null = null;

            if (event) {
                if (['golf', 'golf_arrival', 'golf_departure'].includes(event.type)) {
                    className += ` ${styles.eventDay}`;
                }
                // Simplified classes for modern look
                if (!isFuture) {
                    onClick = () => onDateSelect({ date: dateStr, data: event });
                }
            }

            if (isFuture) className += ` ${styles.futureDay}`;

            currentRow.push(
                <td
                    key={day}
                    className={className}
                    onClick={onClick || undefined}
                    style={{ cursor: onClick ? 'pointer' : 'default' }}
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
                    <button onClick={nextMonth} className={styles.controlButton} disabled={currentDate > today}>Next &rarr;</button>
                </div>
                <table className={styles.calendarTable}>
                    <thead><tr>{dayHeaders}</tr></thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }, [currentDate, events]);

    return <div className={styles.calendarWrapper}>{calendarView}</div>;
};

export default Calendar;