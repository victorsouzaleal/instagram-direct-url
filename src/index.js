const axios = require("axios"), cheerio = require("cheerio"),qs = require('querystring')
module.exports = instagramGetUrl = (url_media) =>{
    return new Promise((resolve,reject)=>{
        var url = "https://sssinstagram.com/results"
        const requestBody = {
            id: url_media.replace("reel", "p"),
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post(url, qs.stringify(requestBody), config).then(result => {
            let $ = cheerio.load(result.data), ig = []
            $('div.button_div > a').each(i => {
                ig[i] = $(this).attr("href")
            })
            resolve({
                results_number : ig.length,
                url_list: ig
            })
        }).catch((err) => {
            reject(err)
        })
    })
}