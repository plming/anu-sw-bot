import assert from "assert";
import axios from "axios";
import * as cheerio from "cheerio";

import { Business } from "./business";

async function getBusinesses(): Promise<Business[]> {
    const response = await axios.get("https://sw.anu.ac.kr/main/sw/jw/main/list.php",
        {
            params: {
                "mid": "/jw/jw_sc",
                "search_bzstat": "S"
            }
        });

    const $ = cheerio.load(response.data);

    const businesses: Business[] = [];
    const nodeList = $(".lc_li");
    for (const node of nodeList) {
        const titleNode = $(node).find('.lc_title');
        const subNode = $(node).find('.lc_li_sub').text();
        const dateRegex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g;

        let id: number;
        {
            let code = titleNode.attr('onclick');
            assert(code !== undefined);

            let result = /\d+/.exec(code);
            assert(result !== null);

            id = parseInt(result[0]);
            assert(!isNaN(id));
        }

        let title: string;
        {
            title = titleNode.text().trim();
        }

        let fromDate: Date;
        {
            let result = dateRegex.exec(subNode);
            assert(result !== null);
            fromDate = new Date(result[0]);
        }

        let toDate: Date;
        {
            let result = dateRegex.exec(subNode);
            assert(result != null);
            toDate = new Date(result[0]);
        }

        const appended: Business = {
            _id: id,
            title: title,
            fromDate: fromDate,
            toDate: toDate,
            url: `https://sw.anu.ac.kr/main/sw/jw/main/view.php?mid=/jw/jw_list_all&bznum=${id}`,
        }

        businesses.push(appended);
    }

    return businesses;
}

export { getBusinesses };