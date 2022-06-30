import assert from "node:assert";
import { CheerioAPI } from "cheerio";

export class Business {
    readonly _id: number;
    readonly title: string;
    readonly bodyText: string;
    readonly applicationStartDate: Date;
    readonly applicationEndDate: Date;
    readonly department: string;

    get url(): string {
        return `https://sw.anu.ac.kr/main/sw/jw/main/view.php?mid=/jw/jw_list_all&bznum=${this._id}`;
    }

    constructor(id: number, document: CheerioAPI) {
        // 1. id 초기화
        this._id = id;

        // 2. title 초기화
        this.title = Business.findInTable('사업명', document);

        // 3. applicationStartDate. applicationEndDate 초기화
        // 신청기간은 '2022-06-17 ~ 2022-07-08'와 같은 형태임
        const [start, end] = Business.findInTable('신청기간', document).split(' ~ ');
        this.applicationStartDate = new Date(start);
        assert(!isNaN(this.applicationStartDate.getTime()));
        this.applicationEndDate = new Date(end);
        assert(!isNaN(this.applicationEndDate.getTime()));

        // 4. department 초기화
        this.department = Business.findInTable('담당부서', document);

        // 5. bodyText 초기화
        const bodyTextData = document('.bbs_content');
        assert(bodyTextData.length === 1);
        this.bodyText = bodyTextData.text();
    }

    private static findInTable(keyword: string, document: CheerioAPI) {
        const header = document(`.th1:contains("${keyword}")`);
        assert(header.length === 1);
        const data = header.next();
        assert(data.length === 1);

        return data.text();
    }
}