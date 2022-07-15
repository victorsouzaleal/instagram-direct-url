const axios = require("axios"), cheerio = require("cheerio"),qs = require('qs')
module.exports = instagramGetUrl = (url_media) =>{
    return new Promise((resolve,reject)=>{
        url_media = url_media.replace("reel", "p")
        var axios = require('axios');
        var data = JSON.stringify({
        "link": url_media
        });

        var config = {
        method: 'post',
        url: 'https://sssinstagram.com/pt/request',
        headers: { 
            'cookie': 'XSRF-TOKEN=eyJpdiI6InZTYkdWN1hLcjk4Tmc5cFFtNStXRWc9PSIsInZhbHVlIjoiU3BqL2hkeXVseUVROW1jOE5YUFdEcnhkZzBnWFk5QitFaEh3bWs2Qjhvb1V4YnNvTEpTbDRBdytRWW1JVGw3QkZGdEdSS25vbkNQTCsvNFVCNmpyRHAwdnA0V0hTZ25PcWZRTGxLLzR2R08zemhJenBTalVXYWU2WjBpcytZa3kiLCJtYWMiOiI1MTY3MTQ2N2QzMjZkYTkxMzEwZjNiYjE3NTMxZDcwYWQzMmNkNTFiNDhjMjg2YmUxOGQyOTE5NDM5MmQyMjcxIiwidGFnIjoiIn0=; laravel_session=eyJpdiI6Im0wNWNKOVZsSWlpWWZhVWR0cDA2cXc9PSIsInZhbHVlIjoibm5aMng2S1drRzA0WkdPQ2YxaE1JVVhJZklBTExoQURQSjJPaWxTYVYyQTBBc2s0T1dBWVZXVkV4bUlnUVBaMGdsWmpiYnExZmhvdEd3LzIreGxONHdDWnF6ck5XYXY0OTVFaW93MTNqM1g5eUw1NVpzOTNQNHVzeFVIbVNKRUsiLCJtYWMiOiI3ZTZiOTk3MDgwODUyZjliYTBhN2E4YmM2NDAzMGNjNDk0NTdhYmVmNGU4ZmIxYmI5ZDhmOTVjZGQxYjRlZDc5IiwidGFnIjoiIn0=; XSRF-TOKEN=eyJpdiI6InNsVFk0UjZ0VDlCNGNkSDdFK01wdnc9PSIsInZhbHVlIjoiemdjT0UzdWo1Vjd1K2NQLzFCcVMzT3BiOW9qcFJtdXhZUlI4enZuOFdkbDd1alBINkpKZUZNTzZ1WlZtMFNxclRCakw1dWp4ZTQvM1IwOXh6T2RzK2pvV1ZaY2VGZUI3K0ZUZ2hQZXJEakdFcHd3VE5RT0k4UnFCYVo4eUtXZDciLCJtYWMiOiI0NmM4MmYxMjA5OWExOGVkZGJlZmI0NGQ2Y2FiNjVlZDQxN2IzZDVjNjIyYzIxMTdlZDA0MzY5NmQwMjUyZmJlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjZMZmNpNjAvUFRudlEyQ240ZTNmWlE9PSIsInZhbHVlIjoiUGZyUTljams1V3JzNjNRU1RSY1NvL21BazlrZnFpWnVvZzJMUVc0SzhvS081WTlIa3hjUUFwTTZZSTZiQkxNYk1CcUFlM3FiVUs2QU5WRzF3MStUMGxpSWRrUVR2Y3ZoUGlRTTNGbEpjR2hxOGEvWFlWeDluVnUxYlZFcHJaY1giLCJtYWMiOiI5YzQ2ZDYxNzA2MTg4MWI0NTEyMGRmZTc4ODgxMzczZWRmYmJmNjgyZjIyNjEyYTg3Y2M1ODhmYmY0Nzg3ZWVmIiwidGFnIjoiIn0%3D', 
            'x-xsrf-token': 'eyJpdiI6InZTYkdWN1hLcjk4Tmc5cFFtNStXRWc9PSIsInZhbHVlIjoiU3BqL2hkeXVseUVROW1jOE5YUFdEcnhkZzBnWFk5QitFaEh3bWs2Qjhvb1V4YnNvTEpTbDRBdytRWW1JVGw3QkZGdEdSS25vbkNQTCsvNFVCNmpyRHAwdnA0V0hTZ25PcWZRTGxLLzR2R08zemhJenBTalVXYWU2WjBpcytZa3kiLCJtYWMiOiI1MTY3MTQ2N2QzMjZkYTkxMzEwZjNiYjE3NTMxZDcwYWQzMmNkNTFiNDhjMjg2YmUxOGQyOTE5NDM5MmQyMjcxIiwidGFnIjoiIn0=', 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config).then(function (response) {
            let result = response.data, ig = [];
            if(result.data.type === "GraphSidecar"){
                result.data.items.forEach(item=>{
                    if (item.type === "GraphVideo"){
                        ig.push(item.video.video_url)
                    } else if (item.type === "GraphImage"){
                        ig.push(item.image.photos[item.image.photos.length - 1].url)
                    }
                })
            } else if (result.data.type === "GraphVideo"){
                ig.push(result.data.video.video_url)
            } else if (result.data.type === "GraphImage"){
                ig.push(result.data.image.photos[result.data.image.photos.length - 1].url)
            }
            resolve({
                results_number : ig.length,
                url_list: ig
            })
        })
        .catch(function (error) {
            reject(error)
        });
    })
}