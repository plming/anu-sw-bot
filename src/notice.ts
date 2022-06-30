import { CheerioAPI } from "cheerio";
import assert from "node:assert";

export default class Notice {
    readonly _id: number;
    readonly title: string;
    readonly bodyText: string;
    readonly author: string;
    readonly createdAt: Date;

    get url(): string {
        return `http://sw.anu.ac.kr/module/bbs/view.php?mid=/community/notice&rdno=${this._id}`;
    }

    constructor(id: number, document: CheerioAPI) {
        this._id = id;
        this.title = document('.bbs_title > .title').text().trim();
        this.author = document('#dpc_content > form > div.bbs_title > div.title_sub > dl > dd:nth-child(2)').text();
        this.bodyText = document('#dpc_content > form > div.bbs_content').text();

        const createdAtText = document('#dpc_content > form > div.bbs_title > div.title_sub > dl > dd:nth-child(6)').text();
        this.createdAt = new Date(createdAtText);
        assert(!isNaN(this.createdAt.getTime()));
    }
}