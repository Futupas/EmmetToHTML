import { makePseudoHtml } from './MakePseudoHtml';
import { PseudoHTML } from './PseudoHTML';
import { prepareString } from './PrepareEmmetString';
// import { PseudoHTML } from './PseudoHTML';


const _global = (globalThis || window /* browser */ || global /* node */) as any;
_global.globalFunction = (a: any) => {
    console.log(a);
    console.log("from global function");
};

(String.prototype as any).toHtml = () => "htmlled string";



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
