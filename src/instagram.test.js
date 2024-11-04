const instagramGetUrl = require("./instagram")

describe("instagramGetUrl", ()=>{
    test("Should successfully get multiple videos/images from the post", async ()=>{
        await expect(instagramGetUrl("https://www.instagram.com/p/CMAMhvgsVal")).toResolve()
    })
    
    test("Should successfully get a single video from the post", async ()=>{
        await expect(instagramGetUrl("https://www.instagram.com/p/C-xlSrwuOfB/")).toResolve()
    })

    test("Should successfully get a single image from the post", async ()=>{
        await expect(instagramGetUrl("https://www.instagram.com/uniaomalacos.ofc/p/C6bkGqBuGwD/?__d=1%2F")).toResolve()
    })
})