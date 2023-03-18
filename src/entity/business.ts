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