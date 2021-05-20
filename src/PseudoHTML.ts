export class PseudoHTML {
    public children: PseudoHTML[] = [];

    public constructor(
        public raw: string,
        public parent?: PseudoHTML,
        public startingInString?: number,
    ) { }

    public parse(): IParsedPseudoHTML {
/*
input: "span.class1.class2#id1[hello=world num=8 countries='Kosovo DNR USSR']{some text}*15"
out: {
    raw: "span.class1.class2#id1[hello=world num=8 countries='Kosovo DNR USSR']{some text}*15",
    tagName: 'div',
    id: 'id1',
    classList: ['class1', 'class2'],
    attributes: [{
        name: 'hello', value: 'world'
    }, {
        name: 'num', value: '8'
    }, {
        name: 'countries', value: 'Kosovo DNR USSR'
    }],
    innerText: 'some text',
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
    value: string;
}
