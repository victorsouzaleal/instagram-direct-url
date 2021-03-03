const axios = require("axios"), cheerio = require("cheerio"),qs = require('querystring')
module.exports = getUrl = (url_media) =>{
    return new Promise((resolve,reject)=>{
        var url = "https://sssinstagram.com/results";
        const requestBody = {
            id: url_media.replace("reel", "p"),
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post(url, qs.stringify(requestBody), config).then((result) => {
            let $ = cheerio.load(result.data);
            let ig = [];
            $('div.button_div > a').each(function (i, e) {
                ig[i] = $(this).attr("href");
            });
            if(ig.length == 0) reject(new Error("404 Media not found"))
            resolve(ig)
        }).catch((err) => {
            reject(err)
        })
    })
}