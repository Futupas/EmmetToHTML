import { EmmetStringParsingError } from "./EmmetStringParsingError";


export class PseudoHTML {
    public children: PseudoHTML[] = [];

    public constructor(
        public raw: string,
        public parent?: PseudoHTML,
        public startingInString?: number,
    ) { }

    public parse2(): IParsedPseudoHTML {
        /*
        input: "span.class1.class2#id1[hello=world num=8 countries='Kosovo DNR USSR' autocomplete]{some text $@3}*15"
        out: {
            raw: "span.class1.class$#id1[hello=world num=8 countries='Kosovo DNR USSR' autocomplete]{some text $@3}*15",
            tagName: 'span',
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
        const enum SpecialChars {
            Tag = '',
            Class = '.',
            Id = '#',
            Attrib = '[',
            EndAttrib = ']',
            Equals = '=',
            InnerText = '{',
            EndInnerText = '}',
            Mult = '*'
        }

        const specialChars = ['', '#', '.', '[', '=', ']', '{', '}', '*', ' '];


        const result: IParsedPseudoHTML = {
            raw: this.raw,
            attributes: [],
            classList: [],
        };

        let prevState = '';
        let currentText: string = '';
        let write: boolean = true;

        let multiplierNow = false;

        const varRe = /([a-zA-Z]){1}([a-zA-Z]|-|_|[0-9])*/;
        const tagRe = /(([a-zA-Z]){1}([a-zA-Z]|-|_|[0-9])*)*/;

        for (let i = 0; i < this.raw.length; i++) {
            if (prevState === SpecialChars.EndAttrib || prevState === SpecialChars.EndInnerText) write = false;
            if (specialChars.includes(this.raw[i])) {

                if (prevState === SpecialChars.InnerText && this.raw[i] === SpecialChars.EndInnerText) {
                    if (write) result.innerText = currentText;
                    prevState = this.raw[i];
                    currentText = '';
                }

                if (prevState === SpecialChars.Attrib && this.raw[i] === SpecialChars.EndAttrib) {
                    if (write) result.attributes.push({ name: currentText });
                    prevState = this.raw[i];
                    currentText = '';
                }
                // Check previous special char if we found a new one
                switch (prevState) {
                    case SpecialChars.InnerText:
                        break;
                    case SpecialChars.Attrib:
                        break;
                    case SpecialChars.Tag:
                        if (write) {
                            result.tagName = currentText;
                            if (!currentText.match(tagRe).includes(currentText))
                                throw new EmmetStringParsingError('tag name syntax error', i);
                        }
                        prevState = this.raw[i];
                        currentText = '';
                        break;
                    case SpecialChars.Id:
                        if (write) {
                            result.id = currentText;
                            if (!currentText.match(varRe).includes(currentText))
                                throw new EmmetStringParsingError('id name syntax error', i);
                        }
                        prevState = this.raw[i];
                        currentText = '';
                        break;
                    case SpecialChars.Class:
                        if (write) {
                            result.classList.push(currentText);
                            if (!currentText.match(varRe).includes(currentText))
                                throw new EmmetStringParsingError('class name syntax error', i);
                        }
                        prevState = this.raw[i];
                        currentText = '';
                        break;
                    case SpecialChars.EndAttrib:
                        if (write) {

                            let isInQuotes = false;
                            let quoteChar = '';
                            let quoteStart = true;

                            let isName = true;

                            let name = '';
                            let value = '';
                            for (let j = 0; j < currentText.length; j++) {
                                if (currentText[j] === ' ') {
                                    if (isName) isName = false;
                                    if (isInQuotes) value += currentText[j];
                                    if (!isInQuotes && name.length !== 0 && value.length !== 0) {
                                        if (!name.match(varRe).includes(currentText))
                                            throw new EmmetStringParsingError("attribute name syntax error", i);
                                        result.attributes.push({name, value});
                                    }
                                } else if (currentText[j] === '=') {
                                    if(!isInQuotes) {
                                        isName=false;
                                    }
                                } else if(currentText[j] === '\"') {
                                    if (!quoteStart) {
                                        quoteStart = true;
                                        quoteChar = '\"';
                                    }
                                    if (quoteStart){
                                        if (currentText[j-1] !== '\\') quoteStart = false;
                                    }
                                } else if (currentText[j] === '\'') {
                                    if (!quoteStart) {
                                        quoteStart = true;
                                        quoteChar = '\'';
                                    }
                                    if (quoteStart){
                                        if (currentText[j-1] !== '\\') quoteStart = false;
                                    }
                                } else if (isName) {
                                    name += currentText[j];
                                } else if (!isName) {
                                    value += currentText[j];
                                }
                            }
                            if (!isName)
                                throw new EmmetStringParsingError('missing value after =', i);

                        }
                        prevState = this.raw[i];
                        currentText = '';
                        break;
                    case SpecialChars.EndInnerText:
                        if (write) result.classList.push(currentText);
                        prevState = this.raw[i];
                        currentText = '';
                        break;
                    case SpecialChars.Mult:
                        if (write) result.classList.push(currentText);
                        prevState = this.raw[i];
                        currentText = '';
                        multiplierNow = true;
                        break;
                }
            } else {
                currentText += this.raw[i];
            }
        }

        return result;
    }
    public parse(): IParsedPseudoHTML {
        /*
        input: "span.class1.class2#id1[hello=world num=8 countries='Kosovo DNR USSR' autocomplete]{some text $@3}*15"
        out: {
            raw: "span.class1.class$#id1[hello=world num=8 countries='Kosovo DNR USSR' autocomplete]{some text $@3}*15",
            tagName: 'span',
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
        const raw = this.raw;
        const result: IParsedPseudoHTML = {
            raw,
            attributes: [],
            classList: [],
            id: '',
            innerText: '',
            quantity: undefined,
            tagName: '',
        };

        const enum ParsedType {
            tag,
            class,
            id,
            innerText,
            quantity,
        }
        let currentParsing = ParsedType.tag;

        for (let i = 0; i < raw.length; i++) {
            const c = raw[i];
            // Todo: support '\{'
            //todo: type attr

            if (currentParsing === ParsedType.innerText) {
                if (c === '}') {
                    currentParsing = undefined;
                } else {
                    result.innerText += c;
                    continue;
                }
            }

            switch(c) {
                case '.':
                    result.classList.push('');
                    currentParsing = ParsedType.class;
                    break;
                case '#':
                    currentParsing = ParsedType.id;
                    break;
                case '{':
                    currentParsing = ParsedType.innerText;
                    break;
                case '*':
                    currentParsing = ParsedType.quantity;
                    break;
                default:
                    switch(currentParsing) {
                        case ParsedType.class:
                            result.classList[result.classList.length - 1] += c;
                            break;
                        case ParsedType.tag:
                            result.tagName += c;
                            break;
                        case ParsedType.id:
                            result.id += c;
                            break;
                        case ParsedType.quantity:
                            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                            if (!numbers.includes(c))
                                throw new EmmetStringParsingError('Unknown number', i + (this.startingInString || 0));
                            const newNum = (result.quantity || 0) * 10 + (+c);
                            result.quantity = newNum;
                            break;
                    }
            }
        }

        console.log(result);
        return result;

    }

    /** Does not append the element anywhere, only makes HTMLElement */
    public render(): HTMLElement[] {
        const parsed = this.parse();
        const elements: HTMLElement[] = [];
        const quantity = parsed.quantity ?? 1;
        for (let i = 0; i < quantity; i++) {
            const el = document.createElement(parsed.tagName || 'div');
            const classes = (parsed.classList ?? []).map(e => this.parseNumInString(e, i, quantity));
            el.classList.add(...classes);
            if (parsed.id) el.setAttribute('id', this.parseNumInString(parsed.id, i, quantity));
            if (parsed.innerText) el.innerText = this.parseNumInString(parsed.innerText, i, quantity);
            for (const attr of (parsed.attributes ?? [])) {
                const attrName = this.parseNumInString(attr.name, i, quantity);
                const attrValue = attr.value ? this.parseNumInString(attr.value, i, quantity) : '';
                el.setAttribute(attrName, attrValue);
            }

            for (const child of this.children) {
                const renderedPartsOfAChild = child.render();
                for (const renderedChild of renderedPartsOfAChild) {
                    el.appendChild(renderedChild);
                }
            }
            elements.push(el);
        }
        return elements;
    }


    /** parses serial nums (depending on its number) like '...$...', $@2 etc */
    protected parseNumInString(str: string, serial: number, quantity: number): string {
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
        for (let i = numsInStr.length - 1; i >= 0; i--) {
            const numInStr = numsInStr[i];
            const prevPartOfString = str.substring(0, numInStr.indexInString);
            const nextPartOfString = str.substring(numInStr.indexInString + numInStr.raw.length);
            const start = (numInStr.startNumber || '1');
            const realNum = numInStr.minus ? (+start + quantity - serial - 1) : (+start + serial);
            let strNum = `${realNum}`;
            while (strNum.length < numInStr.dollars.length) strNum = '0' + strNum;
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
