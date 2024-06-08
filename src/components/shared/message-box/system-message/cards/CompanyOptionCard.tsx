import { twMerge } from 'tailwind-merge'

export const CompanyOptionCard = (props: {
    company: { name: string; address?: string; status?: string }
}) => {
    const { company } = props
    const { name, address, status } = company
    const inactiveStatuses = [
        'Inactive',
        'Dissolution By Proclamation / Annulment Of Authority',
        'Expired   Failure To File Renewal',
        'Inactive   Dissolution By Proclamation / Annulment Of Authority',
        'Terminated',
        'Forfeited Existence',
        'Forfeited   Failed To Timely File A/R',
        'Converted',
        'Inactive Dissolution By Proclamation / Annulment Of Authority',
        'Dead',
        'Forfeited',
        'Delinquent',
        'Withdrawn',
        'Permanently Revoked',
        'Dissolved',
        'Terminated',
        'Expired Reservation',
        'Cancelled',
        'Voluntarily Dissolved',
    ]

    const activeStatuses = [
        'Active',
        'Incorporated',
        'Active In Good Standing',
        'In Existence',
        'Good Standing',
        'Goodstanding',
        'Exists',
    ]

    let statusClass = ''
    if (!status) {
        statusClass = 'text-red-500'
    } else if (activeStatuses.includes(status)) {
        statusClass = 'text-green-500'
    } else if (inactiveStatuses.includes(status)) {
        statusClass = 'text-red-500'
    }

    return (
        <div className="flex h-[200px] w-[220px] cursor-pointer flex-col gap-y-[8px] rounded p-4 shadow-md">
            <p className="text-[15px] font-semibold capitalize ">{name}</p>
            <p className="flex-grow text-[13px] font-normal">Address: {address || 'No address'}</p>
            <p className="text-[13px] font-semibold">
                Status:{' '}
                <span className={twMerge('font-semibold', statusClass)}>
                    {status || 'No status'}
                </span>
            </p>
        </div>
    )
}
