export class PseudoHTML {
    public children: PseudoHTML[] = [];

    public constructor(
        public raw: string,
        public parent?: PseudoHTML,
        public startingInString?: number,
    ) { }

    public parse(): IParsedPseudoHTML {
/*
input: "span.class1.class2#id1[hello=world num=8 countries='Kosovo DNR USSR' autocomplete]{some text $@3}*15"
out: {
    raw: "span.class1.class$#id1[hello=world num=8 countries='Kosovo DNR USSR' autocomplete]{some text $@3}*15",
    tagName: 'div',
    id: 'id1',
    classList: ['class1', 'class$'],
    attributes: [{
        name: 'hello', value: 'world'
    }, {
        name: 'num', value: '8'
    }, {
        name: 'countries', value: 'Kosovo DNR USSR'
    }, {
        name: 'autocomplete'
    }],
    innerText: 'some text $@3',
    quantity: 15,
}
useful docs: https://docs.emmet.io/cheat-sheet/
*/
        const result: IParsedPseudoHTML = {
            raw: this.raw,
        };

        // code here

        return result;
    }

    /** Does not append the element anywhere, only makes HTMLElement */
    public render(): HTMLElement {
        // todo: write this
        const parsed = this.parse();
        const tagName = parsed.tagName || 'div';
        return document.createElement(tagName);
    }

    /** parses serial nums (depending on its number) like '...$...', $@2 etc */
    public parseNumInString(str: string, serial: number, quantity: number): string {
        const numsInStr: INumberInString[] = [];
        let currentNumInStr: INumberInString;
        for (let i = 0; i < str.length; i++) {
            const c = str[i];
            if (currentNumInStr) {
                if (currentNumInStr.extended) {
                    if (c === '-') {
                        currentNumInStr.raw += c;
                        currentNumInStr.minus = true;
                    } else if (isNumber(c)) {
                        currentNumInStr.raw += c;
                        currentNumInStr.startNumber += c;
                    }
                    else {
                        numsInStr.push(currentNumInStr);
                        currentNumInStr = undefined;
                    }
                } else {
                    if (c === '$') {
                        currentNumInStr.raw += c;
                        currentNumInStr.dollars += c;
                    } else if (c === '@') {
                        currentNumInStr.raw += c;
                        currentNumInStr.extended = true;
                    } else {
                        numsInStr.push(currentNumInStr);
                        currentNumInStr = undefined;
                    }
                }
            } else {
                if (c === '$') {
                    currentNumInStr = {
                        raw: c,
                        indexInString: i,
                        minus: false,
                        startNumber: '',
                        dollars: '$',
                        extended: false
                    };
                }
            }
        }
        if (currentNumInStr) numsInStr.push(currentNumInStr);

        // Trick: use a down loop not to make shit with indexOf
        for (let i = numsInStr.length-1; i >= 0; i--) {
            const numInStr = numsInStr[i];
            const prevPartOfString = str.substring(0, numInStr.indexInString);
            const nextPartOfString = str.substring(numInStr.indexInString + numInStr.raw.length);
            const start = (numInStr.startNumber || '1');
            const realNum = numInStr.minus ? (+start + quantity - serial - 1) : (+start + serial);
            let strNum = `${realNum}`;
            while(strNum.length < numInStr.dollars.length) strNum = '0' + strNum;
            str = prevPartOfString + strNum + nextPartOfString;
        }

        return str;
    }
}

export interface IParsedPseudoHTML {
    raw: string;
    tagName?: string;
    id?: string;
    classList?: string[];
    attributes?: IParsedPseudoHTMLAttribute[];
    innerText?: string;
    quantity?: number; // There is a 'trick' with count this
}
export interface IParsedPseudoHTMLAttribute {
    name: string;
    value?: string;
}

interface INumberInString {
    raw: string;
    indexInString: number;
    minus: boolean;
    startNumber: string;
    extended: boolean; // has @
    dollars: string;
}
/** Returns false, if the char is incorrect */
function isNumber(char: string): boolean {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return numbers.includes(char);
}
