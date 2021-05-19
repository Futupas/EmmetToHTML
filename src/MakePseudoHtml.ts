import { PseudoHTML } from './PseudoHTML';

export function makePseudoHtml(str: string): PseudoHTML[] {
    return stringToPseudoHTML(str);
}


/**
 * Main function at the moment
 * @param str
 * @returns
 */
function stringToPseudoHTML(str: string, startPos = 0): PseudoHTML[] {
    const splitted = splitStringToPseudoHTMLElements(str);

    const pseudoParent = new PseudoHTML('PSEUDO_PARENT', undefined, undefined);
    // Very good kostyl
    pseudoParent.parent = pseudoParent;

    let currentElement = pseudoParent;

    for (const celement of splitted) {
        const element = celement;
        element.pos += startPos;
        let parent = currentElement.parent;
        // check changing levels
        if (element.str.startsWith('>')) {
            parent = currentElement;
            element.str = '+' + element.str.substring(1);
        } else if (element.str.startsWith('^')) {
            while (element.str.startsWith('^')) {
                currentElement = currentElement.parent;
                parent = currentElement.parent;
                element.str = element.str.substring(1);
                element.pos++;
            }
            if (element.str === '') continue;
            element.str = '+' + element.str;
            element.pos--;
        }

        // one level
        if (element.str.startsWith('+')) {
            if (element.str.charAt(1) === '(') {
                const pseudoHtmls = stringToPseudoHTML(element.str.substring(2, element.str.length-1), element.pos + 2);
                if (pseudoHtmls.length < 1) {
                    throw new EmmetStringParsingError('Error parsing with brackets (I guess, it\'s because of there are empty brackets)', element.pos);
                } else {
                    currentElement = pseudoHtmls[0];
                }
                for (const addedElement of pseudoHtmls) {
                    addedElement.parent = parent;
                    parent.children.push(addedElement);
                }
            } else {
                const newElement = new PseudoHTML(element.str.substring(1), parent, element.pos);
                parent.children.push(newElement);
                currentElement = newElement;
            }
        }  else {
            throw new EmmetStringParsingError('Incorrect first symbol');
        }
    }

    for (const el of pseudoParent.children) {
        el.parent = undefined;
    }

    return pseudoParent.children;
}

/**
 *
 * @param str
 * @returns
 */
function splitStringToPseudoHTMLElements(input: string): { str: string, pos: number }[] {
    const resultArr: {str: string, pos: number}[] = [];
    let symbol = '+';
    let firstOccurence = getFirstOccurenceOfSpecialCharacter(input);
    let position = -1;
    while (firstOccurence !== false && input.length > 0) {
        const tag = symbol + input.substring(0, firstOccurence);
        resultArr.push({str: tag, pos: position});
        symbol = input.charAt(firstOccurence);
        input = input.substring(firstOccurence + 1);
        position += (firstOccurence + 1);
        firstOccurence = getFirstOccurenceOfSpecialCharacter(input);
    }
    resultArr.push({str: (symbol + input), pos: position});

    return resultArr;
}

/**
 * If string starts with round bracket, it returns first occurence out of brackets
 * @param str
 * @returns false if nothing found
 */
function getFirstOccurenceOfSpecialCharacter(str: string): number | false {
    let startIndex = 0;
    // Kostyl. Needs to be refactored because () are not equal to {}. case: 'div>(hello+{world)}'
    if (str.startsWith('(') || str.startsWith('{')) {
        let level = 0;
        let curlyBrackets = false;
        for (let i = 0; i < str.length; i-=-1) {
            if (str.charAt(i) === '{') curlyBrackets = true;
            if (str.charAt(i) === '}') curlyBrackets = false;
            if (str.charAt(i) === '(' && !curlyBrackets) level++;
            if (str.charAt(i) === ')' && !curlyBrackets) level--;
            if (level === 0) {
                startIndex = i+1;
                str = str.substring(i+1);
                break;
            }
        }
        // Check here if allright (level === 0)
    }
    let indexOfPlus = str.indexOf('+');
    let indexOfNesting = str.indexOf('>');
    let indexOfUp = str.indexOf('^');

    if (indexOfPlus === -1 && indexOfNesting === -1 && indexOfUp === -1) return false;

    if (indexOfPlus === -1) indexOfPlus = Math.max(indexOfNesting, indexOfUp);
    if (indexOfNesting === -1) indexOfNesting = Math.max(indexOfPlus, indexOfUp);
    if (indexOfUp === -1) indexOfUp = Math.max(indexOfPlus, indexOfNesting);

    return Math.min(indexOfPlus, indexOfNesting, indexOfUp) + startIndex;
}



class EmmetStringParsingError extends Error {
    public readonly position: number;

    constructor(message: string, position?: number) {
        super(message);
        this.position = position;
    }
}
