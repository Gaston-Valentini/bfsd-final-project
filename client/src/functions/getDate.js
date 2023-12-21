function getDate(date) {
    const newDate = new Date(date);

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC",
    };

    return newDate.toLocaleDateString("es-ES", options);
}

export { getDate };
