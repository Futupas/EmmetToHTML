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
_global.emmetToPseudoHTML = (s: string): any => {
    const pseudoHTML = makePseudoHtml(s);
    return pseudoHTML.map(pHtml => {
        const newElement: any = pHtml;
        newElement.parsed = pHtml.parse();
        newElement.rendered = pHtml.render();
        return newElement;
    });
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


function emmetToHTML(emmetString: string): HTMLElement[] {
    const preparedString = prepareString(emmetString);
    const pseudoHtml = makePseudoHtml(preparedString);
    const elements: HTMLElement[] = [];
    for (const htmlEl of pseudoHtml) {
        const rendered = htmlEl.render();
        elements.push(...rendered);
    }
    return elements;
}

// function emmetToPseudoHTML(emmetString: string): PseudoHTML[] {
//     const preparedString = prepareString(emmetString);
//     const pseudoHtml = makePseudoHtml(preparedString);
//     return pseudoHtml;
// }

// export function appendEmmet(emmetString: string, container: HTMLElement): void {
//     const elements = emmetToHTML(emmetString);
//     elements.forEach(el => {
//         container.appendChild(el);
//     });
// }

// _global.emmetToPseudoHTML = emmetToPseudoHTML;

declare global {
    interface String {
        toHtml(): HTMLElement[];
    }
    // interface HTMLElement {
    //     appendChildren(...elements: HTMLElement[]): void;
    // }
}
String.prototype.toHtml = () => {
    const str = String(this);
    return emmetToHTML(str);
};
// HTMLElement.prototype.appendChildren = (...elements: HTMLElement[]) => {
//     for (const el of elements) {
//         (this as HTMLElement).appendChild(el);
//     }
// };
