const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
});

export function formatDateMDY(dateString) {
    const [year, month, day] = dateString.split("-");

    return `${MONTH_NAMES[Number(month) - 1]} ${Number(day)}, ${year}`;
}

export function formatDateTime(dateString) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "Invalid date";
    }

    return DATE_TIME_FORMATTER.format(date);
}

export function formatTimeFromDate(dateObject) {
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const meridiem = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    const paddedMinutes = String(minutes).padStart(2, "0");

    return `${hours}:${paddedMinutes} ${meridiem}`;
}