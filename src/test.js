const instagramGetUrl = require("./index")

async function test(url){
    let result = await instagramGetUrl(url)
    return result
}

test("https://www.instagram.com/p/C-xlSrwuOfB/").then(result=>{
    console.log("Test Videos/Images OK")
    console.dir(result, {depth: null})
}).catch(err=>{
    console.error(err)
})
