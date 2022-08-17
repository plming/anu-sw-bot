import assert from "node:assert";

export interface IBusiness {
    readonly _id: number;
    readonly title: string;
    readonly department: string;
    readonly bodyText: string;
    readonly applicationStartDate: Date;
    readonly applicationEndDate: Date;
}

export class Business implements IBusiness {
    get url(): string {
        return `https://sw.anu.ac.kr/main/sw/jw/main/view.php?mid=/jw/jw_list_all&bznum=${this._id}`;
    }

    constructor(
        readonly _id: number,
        readonly title: string,
        readonly department: string,
        readonly bodyText: string,
        readonly applicationStartDate: Date,
        readonly applicationEndDate: Date
    ) {
        assert(!isNaN(applicationStartDate.getTime()));
        assert(!isNaN(applicationEndDate.getTime()));
    }
}