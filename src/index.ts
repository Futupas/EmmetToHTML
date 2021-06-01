import { makePseudoHtml } from './MakePseudoHtml';
import { PseudoHTML } from './PseudoHTML';
import { prepareString } from './PrepareEmmetString';
// import { PseudoHTML } from './PseudoHTML';


const _global = (globalThis || window /* browser */ || global /* node */) as any;

_global.globalFunction = (a: any) => {
    console.log(a);
    console.log("from global function");
};
_global.parseAttributes = (s: string): any => {
    const pseudoHTML = new PseudoHTML(s);
    return pseudoHTML.parse();
};

// String.prototype.toHtml = (a: any) => {
//     console.log(this);
//     console.log(a);
//     return emmetToPseudoHTML(this);
// };
// (HTMLElement.prototype as any).appendChildren = (...children: HTMLElement[]) => {
//     for (const child of children) {
//         (this as HTMLElement).appendChild(child);
//     }
// };


export function emmetToHTML(emmetString: string): HTMLElement[] {
    const preparedString = prepareString(emmetString);
    const pseudoHtml = makePseudoHtml(preparedString);
    // Make real html from pseudoHtml
    // Catch errors
    return [ new HTMLDivElement() ];
}

export function emmetToPseudoHTML(emmetString: string): PseudoHTML[] {
    const preparedString = prepareString(emmetString);
    const pseudoHtml = makePseudoHtml(preparedString);
    return pseudoHtml;
}

export function appendEmmet(emmetString: string, container: HTMLElement): void {
    const elements = emmetToHTML(emmetString);
    elements.forEach(el => {
        container.appendChild(el);
    });
}

_global.emmetToPseudoHTML = emmetToPseudoHTML;

declare global {
    interface String {
        toHtml(): HTMLElement[];
    }
    interface HTMLElement {
        appendChildren(...elements: HTMLElement[]): void;
    }
}
String.prototype.toHtml = () => {
    const str = String(this);
    return emmetToHTML(str);
};
HTMLElement.prototype.appendChildren = (...elements: HTMLElement[]) => {
    //todo refactor, make safety
    for (const el of elements) {
        (this as HTMLElement).appendChild(el);
    }
};
