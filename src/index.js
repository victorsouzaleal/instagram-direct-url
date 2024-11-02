const axios = require('axios');
const qs = require('qs');

axios.defaults.timeout = 0

module.exports = instagramGetUrl = (url_media) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            const BASE_URL = "https://gramsaver.com/api/"
            const split_url_media = url_media.split("/")
            const index_id_video = split_url_media.findIndex(item => item == "p" || item == "reel") + 1
            const ID_VIDEO = split_url_media[index_id_video]
            const config = {
                method: 'get',
                url: BASE_URL+ID_VIDEO,
            };
            const {data} = await axios.request(config)
            if (!data) reject({results_number: 0 , url_list: []})
            let url_list = []
            if(data.media){
                data.media.forEach(media => {
                    console.log(media)
                    if(media.node.is_video){
                        url_list.push(media.node.video_url)
                    } else {
                        url_list.push(media.node.display_url)
                    }
                })
            } else {
                if (data.is_video){
                    url_list.push(data.video_url)
                } else {
                    url_list.push(data.photo_url)
                }
            }
            resolve({results_number: url_list.length , url_list})
        } catch(err){
            reject(err)
        }
    })
}
