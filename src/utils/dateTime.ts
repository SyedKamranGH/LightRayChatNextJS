export const getTimeOfDay = () => {
    const hour = new Date().getHours()

    // determine the time of day.
    if (hour >= 0 && hour < 12) return 'Good morning'
    else if (hour >= 12 && hour < 18) return 'Good afternoon'
    else if (hour >= 18 && hour < 24) return 'Good evening'
    else return 'Hello'
}
