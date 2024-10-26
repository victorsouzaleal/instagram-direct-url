const axios = require('axios');
const qs = require('qs');

axios.defaults.timeout = 0

module.exports = instagramGetUrl = (url_media) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            const BASE_URL = "https://aiovd.com/wp-json/aio-dl/video-data/"

            const dataBody = qs.stringify({
                'url': url_media,
                'token': '0d1a286f793e99721ae2b508c53abf74cc88d27e6ad7daedcaee8ef0ae749b8c' 
            });
              
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: BASE_URL,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : dataBody
            };
              
            const {data} = await axios.request(config)

            if (!data) reject({results_number: 0 , url_list: []})
            
            let url_list = []

            data.medias.forEach(media => {
                url_list.push(media.url)
            })
            
            resolve({results_number: url_list.length , url_list})
        } catch(err){
            reject(err)
        }
    })
}
