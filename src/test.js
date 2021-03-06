const instagramGetUrl = require("./index")

async function main(){
    let result = await instagramGetUrl("https://www.instagram.com/p/CMAMhvgsVal/")
    console.log(result)
}

main()