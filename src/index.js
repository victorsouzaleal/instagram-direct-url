const axios = require("axios"), cheerio = require("cheerio"),qs = require('qs')
module.exports = instagramGetUrl = (url_media) =>{
    return new Promise((resolve,reject)=>{
        url_media = url_media.replace("reel", "p")
        axios.get(url_media).then(result => {
            let $ = cheerio.load(result.data), ig = []
            $('script[type="text/javascript"]').each((i, element) => {
                let cheerioElement = $(element)
                var contentScript = cheerioElement.html()
                if(contentScript.search("shortcode_media") != -1){
                    contentScript = contentScript.replace("window._sharedData = ", "")
                    contentScript = contentScript.replace(";", "")
                    var jsonScript = JSON.parse(contentScript)
                    var mediaData = jsonScript.entry_data.PostPage[0].graphql.shortcode_media
                    if(!mediaData.edge_sidecar_to_children){
                        if(mediaData.is_video) ig.push(mediaData.video_url)
                        else ig.push(mediaData.display_url)
                    } else {
                        for(var m of mediaData.edge_sidecar_to_children.edges){
                            var data = m.node
                            if(data.is_video) ig.push(data.video_url)
                            else ig.push(data.display_url)
                        }
                    }
                }
            })
            resolve({
                results_number : ig.length,
                url_list: ig
            })
        }).catch(err=>{
            reject(err)
        })

    })
}