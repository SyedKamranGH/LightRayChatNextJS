// date - ISO date string
// return - date/month/year ( e.g., 1/1/2023 )
import { DateTime } from 'luxon'

export function formatDate(dateString: string): string {
    const date = DateTime.fromISO(dateString)
    return date.toFormat('MMM d, yyyy')
}

export function timeAgo(utcTime: string) {
    const now = DateTime.now()
    const then = DateTime.fromISO(utcTime, { zone: 'utc' })

    const diff = now.diff(then, ['years', 'months', 'days', 'hours', 'minutes', 'seconds'])

    if (diff.years > 0) return `${diff.years} ${diff.years > 1 ? 'years' : 'year'} ago`
    if (diff.months > 0) return `${diff.months} ${diff.months > 1 ? 'months' : 'month'} ago`
    if (diff.days > 0) return `${diff.days} ${diff.days > 1 ? 'days' : 'day'} ago`
    if (diff.hours > 0) return `${diff.hours} ${diff.hours > 1 ? 'hours' : 'hour'} ago`
    if (diff.minutes > 0)
        return `${Math.floor(diff.minutes)} ${diff.minutes > 1 ? 'minutes' : 'minute'} ago`

    return `${Math.floor(diff.seconds)} ${diff.seconds > 1 ? 'seconds' : 'seconds'} ago`
}
