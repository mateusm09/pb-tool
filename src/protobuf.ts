export function parseMessageNames(nested: Record<string, unknown>) {
    const messageNames: string[] = [];
    for (const key in nested) {
        messageNames.push(key);
    }
    return messageNames;
}
export function parseMessageNamesSelected(nested: Record<string, unknown>) {
    const messageNames: string[] = [];
    for (const key in nested) {
        messageNames.push(key);
    }
    return messageNames;
}
