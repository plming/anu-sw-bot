import axios from "axios";
import * as iconv from "iconv-lite";
import * as cheerio from "cheerio";
import assert from "assert";

interface SupportProject {
    title: string;
    fromDate: Date;
    toDate: Date;
}

async function getSupportProjects(): Promise<SupportProject[]> {
    const result: SupportProject[] = [];
    const response = await axios.get("https://sw.anu.ac.kr/main/sw/jw/main/list.php",
        {
            responseType: "arraybuffer",
            params: {
                "mid": "/jw/jw_sc",
                "search_bzstat": "S"
            }
        });

    const html = iconv.decode(response.data, 'euc-kr');

    const $ = cheerio.load(html);

    const serviceList = $(".lc_li");
    for (const service of serviceList) {
        const title = $(service).find('.lc_title').text().trim();
        const sub = $(service).find('.lc_li_sub').text()
        const dateRegex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g;

        let fromDate: Date;
        {
            let result = dateRegex.exec(sub);
            assert(result != null);
            fromDate = new Date(result[0]);
        }

        let toDate: Date;
        {
            let result = dateRegex.exec(sub);
            assert(result != null);
            toDate = new Date(result[0]);
        }

        result.push({ title: title, fromDate: fromDate, toDate: toDate });
    }
    return result;
}

export { getSupportProjects };