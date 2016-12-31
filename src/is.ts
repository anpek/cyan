export function isArray(item) {
    return item.constructor == Array;
}

export function isString(item) {
    return typeof item == 'string';
}

export function isObjectEmpty(item) {
    return Object.keys(item).length == 0;
}