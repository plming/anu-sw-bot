// export default class Notice {
//     public get url(): string {
//         return `http://sw.anu.ac.kr/module/bbs/view.php?mid=/community/notice&rdno=${this._id}`;
//     }

//     public constructor(
//         public readonly _id: number,
//         public readonly title: string,
//         public readonly bodyText: string,
//         public readonly author: string,
//         public readonly createdAt: Date
//     ) {
//     }
// }

export interface Notice {
    _id: number,
    title: string,
    bodyText: string,
    author: string,
    createdAt: Date
}

export function getNoticeUrl(id: number): string {
    return `http://sw.anu.ac.kr/module/bbs/view.php?mid=/community/notice&rdno=${id}`;
}