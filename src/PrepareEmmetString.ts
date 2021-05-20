
 export function prepareString(notPreparedString: string): void {
    if (notPreparedString[0] === ' ') {
        console.error('Found space on the start');
        return;
    }
    notPreparedString.trim();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < notPreparedString.length; i++) {
        if (notPreparedString[i] === ' ') {
            console.error('Found space on${i + 1} position');
            return;
        }
        if (notPreparedString[i] === '{') {
            while (notPreparedString[i] !== '}') {
                if (notPreparedString[i] === '&') {
                    console.log('looks like a start of special character')
                    // place for special character
                }
            }
        }
    }



// let data: Array<string> = ['qwdqwdqwd', 'qwdqwdqwdqwd', '   qwdqwdqwd   ', 'dqwdwdqwq w dqwd qwd qd']
// data.forEach((elem) => {
//     parser(elem)
// })
 }
