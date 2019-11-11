import isDev from 'electron-is-dev';

export function devLog(message) {
    if (isDev) {
        console.log(message);
    }
}