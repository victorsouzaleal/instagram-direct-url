const axios = require("axios")
const qs = require("qs")

module.exports = instagramGetUrl = (url_media) =>{
    return new Promise(async (resolve,reject)=>{
        const BASE_URL = "https://api.sssgram.com/st-tik/ins/dl?"
        try {            
            //REQUEST CONFIG
            var config = {
                method: 'get',
                url: `${BASE_URL}url=${url_media}&timestamp=${Date.now()}`,
                headers: { 
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Origin': 'https://www.sssgram.com',
                    'Connection': 'keep-alive',
                    'Referer': 'https://www.sssgram.com/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site'
                }
            }

            //REQUEST
            axios(config)
            .then(function (response) {
                let igresponse = {results_number: response.data.result.count || 0, url_list: []}
                if(response.data.result.count != null){
                    response.data.result.insBos.forEach(media => {
                        igresponse.url_list.push(media.url)
                    })
                }
                resolve(igresponse)
            })
            .catch((err) =>{
                reject(err)
            })

        } catch(err){
            reject(err)
        }
    })
}