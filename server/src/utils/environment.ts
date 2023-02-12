export function isTesting(): boolean {
    return process.env.NODE_ENV === 'testing';
}