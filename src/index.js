const axios = require('axios');
const qs = require('qs');

axios.defaults.timeout = 0

module.exports = instagramGetUrl = (url_media) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            const BASE_URL = "https://www.instagram.com/graphql/query"
            const INSTAGRAM_DOCUMENT_ID = "8845758582119845"
            const split_url_media = url_media.split("/")
            const index_id_video = split_url_media.findIndex(item => item == "p" || item == "reel") + 1
            const ID_POST = split_url_media[index_id_video]
        
            let dataBody = qs.stringify({
            'variables': JSON.stringify({
                'shortcode':ID_POST,
                'fetch_tagged_user_count': null,
                'hoisted_comment_id': null,
                'hoisted_reply_id': null
            }),
            'doc_id': INSTAGRAM_DOCUMENT_ID 
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: BASE_URL,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : dataBody
            };

            const {data : result} = await axios.request(config)
            const media_info = result.data.xdt_shortcode_media
            if (!result) reject({results_number: 0 , url_list: []})
            let url_list = []
            if(media_info.edge_sidecar_to_children){
                media_info.edge_sidecar_to_children.edges.forEach(media => {
                    if(media.node.is_video){
                        url_list.push(media.node.video_url)
                    } else {
                        console.log(media)
                        url_list.push(media.node.display_url)
                    }
                })
            } else {
                url_list.push(media_info.is_video ? media_info.video_url : media_info.display_url)
            }

            resolve({results_number: url_list.length , url_list})
        } catch(err){
            reject(err)
        }
    })
}
