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