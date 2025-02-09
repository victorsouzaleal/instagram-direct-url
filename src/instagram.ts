import axios from 'axios'
import qs from 'qs'

//Interface
export interface InstagramResponse {
    results_number: number,
    url_list: string[],
    post_info: {
        owner_username: string,
        owner_fullname: string,
        is_verified: boolean,
        is_private: boolean,
        likes: number,
        is_ad: boolean,
        caption: string
    },
    media_details: {
        type: string,
        dimensions: {
            height: number,
            width: number
        },
        url: string,
        video_view_count?: number,
        thumbnail?: string
    }[],
}

export interface InstagramError {
    error: string
}

//Main function
export default async function instagramGetUrl (url_media : string){
    return new Promise <InstagramResponse> (async (resolve,reject)=>{
        try {
            url_media = await checkRedirect(url_media)
            const SHORTCODE = getShortcode(url_media)
            const INSTAGRAM_REQUEST = await instagramRequest(SHORTCODE)
            const OUTPUT_DATA = createOutputData(INSTAGRAM_REQUEST)
            resolve(OUTPUT_DATA as InstagramResponse)
        } catch(err : any){
            let error = {
                error: err.message
            }
            reject(error)
        }
    })
}

//Utilities
async function checkRedirect (url : string){
    let split_url = url.split("/")
    if(split_url.includes("share")){
        let res = await axios.get(url)
        return res.request.path
    }
    return url
}

function formatPostInfo(requestData : any){
    try{
        let mediaCapt = requestData.edge_media_to_caption.edges
        const capt = (mediaCapt.length === 0) ? "" : mediaCapt[0].node.text
        return {
            owner_username: requestData.owner.username,
            owner_fullname: requestData.owner.full_name,
            is_verified: requestData.owner.is_verified,
            is_private: requestData.owner.is_private,
            likes: requestData.edge_media_preview_like.count,
            is_ad: requestData.is_ad,
            caption: capt
        }
    } catch(err : any){
        throw new Error(`Failed to format post info: ${err.message}`)
    }
}

function formatMediaDetails(mediaData : any){
    try{
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
    } catch(err : any){
        throw new Error(`Failed to format media details: ${err.message}`)
    }
}

function getShortcode(url : string){
    try{
        let split_url = url.split("/")
        let post_tags = ["p", "reel", "tv", "reels"]
        let index_shortcode = split_url.findIndex(item => post_tags.includes(item)) + 1
        let shortcode = split_url[index_shortcode]
        return shortcode
    } catch(err : any){
        throw new Error(`Failed to obtain shortcode: ${err.message}`)
    }
}

function isSidecar(requestData : any){
    try{
        return requestData["__typename"] == "XDTGraphSidecar"
    } catch(err : any){
        throw new Error(`Failed sidecar verification: ${err.message}`)
    }
}

async function instagramRequest(shortcode: string) {
    try{
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
        if(!data.data?.xdt_shortcode_media) throw new Error("Only posts/reels supported, check if your link is valid.")
        return data.data.xdt_shortcode_media
    } catch(err : any){
        throw new Error(`Failed instagram request: ${err.message}`)
    }
}

function createOutputData(requestData : any){
    try{
        let url_list = [], media_details = []
        const IS_SIDECAR = isSidecar(requestData)
        if(IS_SIDECAR){
            //Post with sidecar
            requestData.edge_sidecar_to_children.edges.forEach((media : any)=>{
                media_details.push(formatMediaDetails(media.node))
                if(media.node.is_video){ //Sidecar video item
                    url_list.push(media.node.video_url as string)
                } else { //Sidecar image item
                    url_list.push(media.node.display_url as string)
                }
            })
        } else {
            //Post without sidecar
            media_details.push(formatMediaDetails(requestData))
            if(requestData.is_video){ // Video media
                url_list.push(requestData.video_url as string)
            } else { //Image media
                url_list.push(requestData.display_url as string)
            }
        }

        return {
            results_number: url_list.length,
            url_list,
            post_info: formatPostInfo(requestData),
            media_details
        }
    } catch(err : any){
        throw new Error(`Failed to create output data: ${err.message}`)
    }
}



