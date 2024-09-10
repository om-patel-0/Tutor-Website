// script.js

const daysContainer = document.getElementById('days-container');
const monthYearDisplay = document.getElementById('month-year');
let currentDate = new Date(); // Get the current date

function loadCalendar(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    
    // Set the month and year in the header
    monthYearDisplay.textContent = date.toLocaleString('default', { month: 'long' }) + ' ' + year;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    daysContainer.innerHTML = ''; // Clear the previous days

    // Render day names (Sun-Sat)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day-name');
        dayDiv.textContent = day;
        daysContainer.appendChild(dayDiv);
    });

    // Add blank spaces for days of the previous month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty-day');
        daysContainer.appendChild(emptyDiv);
    }

    // Add the days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        const fullDate = new Date(year, month, day);

        // Check if the date is before today
        if (fullDate < new Date().setHours(0, 0, 0, 0)) {
            // Make past dates red or X'd out
            dayDiv.classList.add('past-day');
            dayDiv.textContent = 'X'; // You can either show 'X' or keep the day number in red
        } else {
            // Redirect to booking.html with the selected date as a query parameter
            dayDiv.addEventListener('click', () => {
                window.location.href = `booking.html?date=${year}-${month + 1}-${day}`; 
            });
        }

        daysContainer.appendChild(dayDiv);
    }
}

// Handle month navigation
document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar(currentDate);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar(currentDate);
});

// Initialize the calendar
loadCalendar(currentDate);

document.addEventListener('DOMContentLoaded', function () {
    const flipCard = document.querySelector('.flip-card');

    flipCard.addEventListener('click', function () {
        flipCard.classList.toggle('flipped');
    });
});

