<p align="center">
<img src="https://avatars0.githubusercontent.com/u/4674786?s=400&u=2f77d382a4428c141558772a2b7ad3a36bebf5bc&v=4" width="128" height="128"/>
</p>
<p align="center">
<a href="#"><img title="Instagram-Direct-URL" src="https://img.shields.io/badge/Instagram%20Direct%20URL-green?colorA=%23ff0000&colorB=C13584&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/victorsouzaleal"><img title="Autor" src="https://img.shields.io/badge/Author-victorsouzaleal-5851DB.svg?style=for-the-badge&logo=github"></a>
</p>
</p>
<p align="center">
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fvictorsouzaleal%2Finstagram-direct-url.git&count_bg=%23833AB4&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true"/></a>
<a href="#"><img title="Version" src="https://img.shields.io/github/package-json/v/victorsouzaleal/instagram-direct-url?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="#"><img title="Size" src="https://img.shields.io/bundlephobia/min/instagram-url-direct?color=%23833AB4&logo=npm&style=flat-square"></a>
<a href="https://github.com/victorsouzaleal/followers"><img title="Followers" src="https://img.shields.io/github/followers/victorsouzaleal?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/victorsouzaleal/instagram-direct-url/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/victorsouzaleal/instagram-direct-url?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/victorsouzaleal/lbot-whatsapp/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/victorsouzaleal/instagram-direct-url?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="#"><img title="MAINTENED" src="https://img.shields.io/badge/MAINTENED-YES-%23833AB4?style=flat-square"/></a>
</p>

## Installation
```bash
> npm install --save instagram-url-direct
```

## Example
```js
const instagramGetUrl = require('instagram-url-direct');
const data = await instagramGetUrl('https://www.instagram.com/p/CpTo4jfPJiz');
console.log(data);
```
## Output
```
[
  {
    fileExtension: 'jpg',
    directUrl: 'https://scontent.cdninstagram.com/v/t51.2885-15/331124941_920301342353839_7915519387355868397_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=urHySRc88YwAX-epd64&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBcED1UAH3jadGIflN2OcoU9DT6zCucixhi9WG2p0qSkQ&oe=640DCAE9&_nc_sid=978cb9&dl=1'
  }
]
```
