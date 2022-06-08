import assert from "assert";
import axios from "axios";
import * as cheerio from "cheerio";
import * as iconv from "iconv-lite";

import { SupportProject } from "./supportProject";

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

    const projectList = $(".lc_li");
    for (const project of projectList) {
        const titleNode = $(project).find('.lc_title');

        let id: number;
        {
            let code = titleNode.attr('onclick');
            assert(code !== undefined);

            let result = /\d+/.exec(code);
            assert(result !== null);

            id = parseInt(result[0]);
            assert(!isNaN(id));
        }

        const title = titleNode.text().trim();

        const sub = $(project).find('.lc_li_sub').text();
        const dateRegex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g;

        let fromDate: Date;
        {
            let result = dateRegex.exec(sub);
            assert(result !== null);
            fromDate = new Date(result[0]);
        }

        let toDate: Date;
        {
            let result = dateRegex.exec(sub);
            assert(result != null);
            toDate = new Date(result[0]);
        }

        const url = `https://sw.anu.ac.kr/main/sw/jw/main/view.php?mid=/jw/jw_list_all&bznum=${id}`;

        const appended: SupportProject = {
            _id: id,
            title: title,
            fromDate: fromDate,
            toDate: toDate,
            url: url
        }

        result.push(appended);
    }

    return result;
}

export { getSupportProjects };