export const random = Object.freeze({
    choice: <T>(arr: T[], randomCount: number = 4): T[] => {
        // if the array is empty or the randomCount is 0, return an empty array.
        if (arr.length === 0 || randomCount === 0) {
            return []
        }

        // adjust randomCount if it's greater than the array length
        randomCount = Math.min(randomCount, arr.length)

        // create a copy of the array
        const availableItems = [...arr]

        const selectedItems: T[] = []
        for (let i = 0; i < randomCount; i++) {
            // randomly select an item
            const randomIndex = Math.floor(Math.random() * availableItems.length)
            selectedItems.push(availableItems[randomIndex])

            // remove the selected item from the available items
            availableItems.splice(randomIndex, 1)
        }

        return selectedItems
    },
})
