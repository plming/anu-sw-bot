// export default class Business {
//     public get url(): string {
//         return `https://sw.anu.ac.kr/main/sw/jw/main/view.php?mid=/jw/jw_list_all&bznum=${this._id}`;
//     }

//     public constructor(
//         public readonly _id: number,
//         public readonly title: string,
//         public readonly department: string,
//         public readonly bodyText: string,
//         public readonly applicationStartDate: Date,
//         public readonly applicationEndDate: Date,
//     ) {
//     }
// }

export interface Business {
    _id: number,
    title: string,
    department: string,
    bodyText: string,
    applicationStartDate: Date,
    applicationEndDate: Date
}

export function getBusinessUrl(id: number): string {
    return `https://sw.anu.ac.kr/main/sw/jw/main/view.php?mid=/jw/jw_list_all&bznum=${id}`;
}