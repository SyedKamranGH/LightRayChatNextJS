import { Snag } from 'snag'

export function replaceLast<T>(array: T[], newValue: T): T[] {
    if (array.length === 0) {
        throw new Snag({
            message:
                'Calling array#replaceLast on empty array. Array should have at least one item.',
        })
    }

    return [...array.slice(0, -1), newValue]
}
