const axios = require('axios')
const qs = require('qs')

function formatPostInfo(requestData){
    return {
        owner_username: requestData.owner.username,
        owner_fullname: requestData.owner.full_name,
        is_verified: requestData.owner.is_verified,
        is_private: requestData.owner.is_private,
        likes: requestData.edge_media_preview_like.count,
        is_ad: requestData.is_ad
    }
}

function formatMediaDetails(mediaData){
    if(mediaData.is_video){
        return {
            type: "video",
            dimensions: mediaData.dimensions,
            video_view_count: mediaData.video_view_count,
            url: mediaData.video_url,
            thumbnail: mediaData.display_url
        }
    } else {
        return {
            type: "image",
            dimensions: mediaData.dimensions,
            url: mediaData.display_url
        }
    }

}

function getShortcode(url){
    let split_url = url.split("/")
    let index_shortcode = split_url.findIndex(item => item == "p" || item == "reel") + 1
    let shortcode = split_url[index_shortcode]
    return shortcode
}

function isSidecar(requestData){
    return requestData["__typename"] == "XDTGraphSidecar"
}

async function instagramRequest(shortcode) {
    const BASE_URL = "https://www.instagram.com/graphql/query"
    const INSTAGRAM_DOCUMENT_ID = "8845758582119845"
    let dataBody = qs.stringify({
        'variables': JSON.stringify({
            'shortcode': shortcode,
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

    const {data} = await axios.request(config)
    return data.data.xdt_shortcode_media
}

function createOutputData(requestData){
    let url_list = [], media_details = []
    const IS_SIDECAR = isSidecar(requestData)
    if(IS_SIDECAR){
        //Post with sidecar
        requestData.edge_sidecar_to_children.edges.forEach((media)=>{
            media_details.push(formatMediaDetails(media.node))
            if(media.node.is_video){ //Sidecar video item
                url_list.push(media.node.video_url)
            } else { //Sidecar image item
                url_list.push(media.node.display_url)
            }
        })
    } else {
        //Post without sidecar
        media_details.push(formatMediaDetails(requestData))
        if(requestData.is_video){ // Video media
            url_list.push(requestData.video_url)
        } else { //Image media
            url_list.push(requestData.display_url)
        }
    }

    return {
        results_number: url_list.length,
        url_list,
        post_info: formatPostInfo(requestData),
        media_details
    }
}


module.exports = instagramGetUrl = (url_media) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            const SHORTCODE = getShortcode(url_media)
            const INSTAGRAM_REQUEST = await instagramRequest(SHORTCODE)
            const OUTPUT_DATA = createOutputData(INSTAGRAM_REQUEST)
            resolve(OUTPUT_DATA)
        } catch(err){
            reject(err)
        }
    })
}
