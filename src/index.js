const axios = require("axios"), cheerio = require("cheerio"),qs = require('qs')
module.exports = instagramGetUrl = (url_media) =>{
    return new Promise((resolve,reject)=>{
        url_media = url_media.replace("reel", "p")
        var url = "https://igram.io/i/"
        const requestBody = {
            url: url_media.replace("reel", "p"),
            lang_code: "en"
        }

        const config = {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.75', 
                'x-requested-with': ' XMLHttpRequest', 
                'origin': ' https://igram.io', 
                'referer': ' https://igram.io/en/dl/', 
                'sec-fetch-dest': ' empty', 
                'sec-fetch-mode': ' cors', 
                'sec-fetch-site': ' same-origin', 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Cookie': '__cfduid=d4c2ddc2229a4d74c28b6ba25cdcd2a181618175605'
              },
        }

        axios.post(url, qs.stringify(requestBody), config).then(result => {
            let $ = cheerio.load(result.data), ig = []
            //Obter todos os links de videos da pagina carregada
            $('[data-mediatype=Video]').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("href"))
            })
            //Obter todos os links de imagem da pagina carregada
            $('div > div.bg-white.border.rounded-sm.max-w-md > img').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("src"))
            })

            resolve({
                results_number : ig.length,
                url_list: ig
            })
        }).catch(err=>{
            console.log(err.response)
            reject(err)
        })
        /*
        var url = url_media.replace("instagram","sssinstagram")
        const requestBody = {
            id: url_media.replace("reel", "p"),
            tt: "69798d4e7d1623a164eb3930e17246c8",
            ts: 1615050939
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post(url, qs.stringify(requestBody), config).then(result => {
            let $ = cheerio.load(result.data), ig = []
            $('div.result_overlay > div > div > a').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("href"))
            })
    
            if(ig.length == 0){
                $('div.result_overlay > a').each((i, element) => {
                    let cheerioElement = $(element)
                    ig.push(cheerioElement.attr("href"))
                })
            }
            resolve({
                results_number : ig.length,
                url_list: ig
            })
        }).catch((err) => {
            reject(err)
        })*/
    })
}