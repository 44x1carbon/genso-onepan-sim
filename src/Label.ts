export const typeLabel = (type: string) => {
    switch (type) {
        case 'physics':
            return '物理';
        case 'magic':
            return '魔法';
        default: return undefined
    }
}

export const elementLabel = (type: string) => {
    switch (type) {
        case "devil": return "魔"
        case "ground": return "土"
        case "water": return "水"
        case "fire": return "火"
        case "wind": return "風"
        case "shine": return "光"
        case "dark": return "闇"
        case "empty": return "無"
        default: return undefined
    }
}