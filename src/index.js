const axios = require('axios');
const qs = require('qs');

axios.defaults.timeout = 0

module.exports = instagramGetUrl = (url_media) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            const BASE_URL = "https://instagram-scraper-api2.p.rapidapi.com/v1/post_info"
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${BASE_URL}?code_or_id_or_url=${url_media}&include_insights=false`,
                headers: { 
                  'Host': ' instagram-scraper-api2.p.rapidapi.com', 
                  'User-Agent': ' Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0', 
                  'Accept': ' */*', 
                  'Accept-Language': ' pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3', 
                  'Accept-Encoding': ' gzip, deflate, br, zstd', 
                  'Referer': ' https://storyclone.com/', 
                  'x-rapidapi-host': ' instagram-scraper-api2.p.rapidapi.com', 
                  'x-rapidapi-key': ' 61f99d3e77msh61688cbb09796b4p18b365jsn09c26ce3e5c4', 
                  'Origin': ' https://storyclone.com', 
                  'Connection': ' keep-alive', 
                  'Sec-Fetch-Dest': ' empty', 
                  'Sec-Fetch-Mode': ' cors', 
                  'Sec-Fetch-Site': ' cross-site', 
                  'Priority': ' u=0', 
                  'TE': ' trailers'
                }
            };
            const {data} = await axios.request(config)
            if (!data) reject({results_number: 0 , url_list: []})
            let url_list = []
            if(data.data.carousel_media){
                data.data.carousel_media.forEach(media => {
                    if(media.is_video){
                        url_list.push(media.video_url)
                    } else {
                        url_list.push(media.thumbnail_url)
                    }
                })
            } else {
                url_list.push(data.data.is_video ? data.data.video_url : data.data.thumbnail_url)
            }

            resolve({results_number: url_list.length , url_list})
        } catch(err){
            reject(err)
        }
    })
}
