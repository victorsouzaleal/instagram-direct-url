<p align="center">
<img src="https://avatars0.githubusercontent.com/u/4674786?s=400&u=2f77d382a4428c141558772a2b7ad3a36bebf5bc&v=4" width="128" height="128"/>
</p>
<p align="center">
<a href="#"><img title="Instagram-Direct-URL" src="https://img.shields.io/badge/Instagram%20Direct%20URL-green?colorA=%23ff0000&colorB=C13584&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/victorsouzaleal"><img title="Autor" src="https://img.shields.io/badge/Author-victorsouzaleal-5851DB.svg?style=for-the-badge&logo=github"></a>
</p>
<p align="center">
<a href="https://www.codefactor.io/repository/github/victorsouzaleal/instagram-direct-url"><img src="https://www.codefactor.io/repository/github/victorsouzaleal/instagram-direct-url/badge/main" alt="CodeFactor" /></a>
</p>
<p align="center">
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fvictorsouzaleal%2Finstagram-direct-url.git&count_bg=%23833AB4&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true"/></a>
<a href="#"><img title="Version" src="https://img.shields.io/github/package-json/v/victorsouzaleal/instagram-direct-url?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="#"><img title="Size" src="https://img.shields.io/github/languages/code-size/victorsouzaleal/instagram-direct-url?color=%23833AB4&label=size&logo=github&style=flat-square"></a>
<a href="https://github.com/victorsouzaleal/followers"><img title="Followers" src="https://img.shields.io/github/followers/victorsouzaleal?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/victorsouzaleal/instagram-direct-url/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/victorsouzaleal/instagram-direct-url?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="https://github.com/victorsouzaleal/lbot-whatsapp/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/victorsouzaleal/instagram-direct-url?color=%23833AB4&logo=github&style=flat-square"></a>
<a href="#"><img title="MAINTENED" src="https://img.shields.io/badge/MAINTENED-YES-%23833AB4?style=flat-square"/></a>
</p>

## Instalation :
```bash
> npm i --save instagram-direct-url
```

## Example
```js
const instagramGetUrl = require("instagram-direct-url")
let links = await instagramGetUrl("https://www.instagram.com/p/CL5QQPOJFl_/")
console.log(links)
```
## Output Exemple
```
	[
    	'https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/118774947_241673823S2_22161510709798728843_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=1697Ifcdsasdasd2312321=3213123213',
        'https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/118774947_241673823S2_22161510709798728843_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=1697Ifcdsasdasd2312321=3213123213',
        'https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/118774947_241673823S2_22161510709798728843_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=1697Ifcdsasdasd2312321=3213123213',
        'https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/118774947_241673823S2_22161510709798728843_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=104&_nc_ohc=1697Ifcdsasdasd2312321=3213123213',
    ]
````