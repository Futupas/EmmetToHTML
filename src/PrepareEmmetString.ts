import { EmmetStringParsingError } from './EmmetStringParsingError';

export function prepareString(notPreparedString: string): string {
    // if (notPreparedString[0] === ' ') {
    //     throw new EmmetStringParsingError('Found space on the start', 0);
    // }
    // notPreparedString = notPreparedString.trim();

    // for (let i = 0; i < notPreparedString.length; i++) {
    //     if (notPreparedString[i] === ' ') {
    //         console.error(`Found space on ${i + 1} position`);
    //         return;
    //     }
    //     if (notPreparedString[i] === '{') {
    //         while (notPreparedString[i] !== '}') {
    //             if (notPreparedString[i] === '&') {
    //                 console.log('looks like a start of special character');
    //                 // place for special character
    //             }
    //         }
    //     }
    // }

    return notPreparedString;
}

// let data: Array<string> = ['qwdqwdqwd', 'qwdqwdqwdqwd', '   qwdqwdqwd   ', 'dqwdwdqwq w dqwd qwd qd']
// data.forEach((elem) => {
//     parser(elem)
// })
