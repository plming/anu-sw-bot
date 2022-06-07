import axios, { AxiosRequestHeaders } from "axios";

async function postNotice(notice: {}) {
    const data = {
        'text': JSON.stringify(notice)
    }

    const headers: AxiosRequestHeaders = {
        'Content-type': 'application/json'
    }

    await axios.post(process.env.SLACK_WEBHOOK_URL, data, headers)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
        })
}

export { postNotice };