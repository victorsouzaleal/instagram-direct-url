const CryptoJS = require('crypto-js')

function encryptUrl (input) {
    const key = CryptoJS.enc.Utf8.parse('qwertyuioplkjhgf')
    const iv = CryptoJS.lib.WordArray.random(16)

    const encrypted = CryptoJS.AES.encrypt(input, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });

    const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    return encryptedHex
}


module.exports = instagramGetUrl = (url_media) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            const BASE_URL = "https://backend.instavideosave.com/allinone"
            const headers = {
                'url': encryptUrl(url_media)
            }
            const response = await fetch(BASE_URL, {
                method: 'GET',
                headers,
            })

            const data = await response.json()
            if (!data) reject({results_number: 0 , url_list: []})
            
            let url_list = []

            if(data.video){
                data.video.forEach(infovideo => {
                    if(infovideo.video) {
                        url_list.push(infovideo.video)
                    } else {
                        url_list.push(infovideo.thumbnail)
                    }
                })
            }

            if(data.image){
                data.image.forEach(image => {
                    url_list.push(image)
                })
            }
            
            resolve({results_number: url_list.length , url_list})
        } catch(err){
            reject(err)
        }
    })
}
