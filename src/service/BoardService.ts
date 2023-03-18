import assert from "node:assert";
import axios from "axios";
import * as cheerio from "cheerio";

import { Business } from "../entity/business";
import { Notice } from '../entity/notice';

export async function getCurrentBusinessIds(): Promise<number[]> {
    const parentPage = await loadDocument("https://sw.anu.ac.kr/main/sw/jw/main/list.php", {
        "search_bzstat": "S" // 접수중 상태인 지원사업만 조회 
    });

    const ids: number[] = [];
    const nodeList = parentPage(".lc_title_M")
    for (const node of nodeList) {
        // 예를 들어 "javascript:goView('397')"; 에서 397을 추출함
        const onClickText = node.attribs['onclick'];
        const splited = onClickText.split("\'");

        const id = parseInt(splited[1]);
        assert(!isNaN(id));

        ids.push(id);
    }

    return ids;
}

export async function getBusiness(id: number): Promise<Business> {
    const childPage = await loadDocument("https://sw.anu.ac.kr/main/sw/jw/main/view.php", { "bznum": id });
    const title = childPage('.th1:contains("사업명")').next().text().trim();
    const department = childPage('.th1:contains("담당부서")').next().text().trim();
    const bodyText = childPage('.bbs_content').text().trim();
    const [start, end] = childPage('.th1:contains("신청기간")').next().text().split(' ~ ');
    const applicationStartDate = new Date(start);
    const applicationEndDate = new Date(end);

    assert(!isNaN(applicationStartDate.getTime()));
    assert(!isNaN(applicationEndDate.getTime()));

    return {
        _id: id,
        title: title,
        department: department,
        bodyText: bodyText,
        applicationStartDate: applicationStartDate,
        applicationEndDate: applicationEndDate
    }
}

export async function getCurrentNoticeIds(): Promise<number[]> {
    const parentPage = await loadDocument('https://sw.anu.ac.kr/module/bbs/list.php', { 'mid': '/community/notice' });

    const ids: number[] = [];
    const nodeList = parentPage('.bbs_B_td_tr');

    for (const node of nodeList) {
        // 예를 들어 "goView(0, 719, 719);" 에서 719를 추출함
        const onClickText = node.attribs['onclick'];
        const splited = onClickText.split(',');

        const id = parseInt(splited[1]);
        assert(!isNaN(id));

        ids.push(id);
    }

    return ids;
}

export async function getNotice(id: number): Promise<Notice> {
    const childPage = await loadDocument("http://sw.anu.ac.kr/module/bbs/view.php", { 'rdno': id });

    const title = childPage('.bbs_title > .title').text().trim();
    const author = childPage('#dpc_content > form > div.bbs_title > div.title_sub > dl > dd:nth-child(2)').text().trim();
    const bodyText = childPage('#dpc_content > form > div.bbs_content').text().trim();
    const createdAtText = childPage('#dpc_content > form > div.bbs_title > div.title_sub > dl > dd:nth-child(6)').text();
    const createdAt = new Date(createdAtText);
    assert(!isNaN(createdAt.getTime()));

    return {
        _id: id,
        title: title,
        bodyText: bodyText,
        author: author,
        createdAt: createdAt
    }
}

async function loadDocument(url: string, params: any) {
    const response = await axios.get(url, { params: params });
    const document = cheerio.load(response.data);

    return document;
}