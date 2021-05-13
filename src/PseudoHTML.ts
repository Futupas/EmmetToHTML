export class PseudoHTML {
    public children: PseudoHTML[] = [];

    public constructor(
        public tag: string,
        public parent?: PseudoHTML
    ) { }
}
