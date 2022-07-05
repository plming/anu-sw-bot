import assert from "node:assert";

export interface INotice {
    readonly _id: number;
    readonly title: string;
    readonly bodyText: string;
    readonly author: string;
    readonly createdAt: Date;
}

export class Notice {
    get url(): string {
        return `http://sw.anu.ac.kr/module/bbs/view.php?mid=/community/notice&rdno=${this._id}`;
    }

    constructor(
        readonly _id: number,
        readonly title: string,
        readonly bodyText: string,
        readonly author: string,
        readonly createdAt: Date
    ) {
        assert(!isNaN(createdAt.getTime()));
    }
}