const instagramGetUrl = require('./index');

test('https://www.instagram.com/p/CMAMhvgsVal')
    .then((results) => console.log('[test] videos and images: PASS.', results))
    .catch((error) => console.log('[test] videos and images: FAIL.', error));

test('https://www.instagram.com/p/CHSvvKXpkH6')
    .then((results) => console.log('[test] image only: PASS.', results))
    .catch((error) => console.log('[test] image only: FAIL.', error));

test('https://www.instagram.com/tv/CdmYaq3LAYo')
    .then((results) => console.log('[test] video only: PASS.', results))
    .catch((error) => console.log('[test] video only: FAIL.', error));

async function test(url) {
    const results = await instagramGetUrl(url)
    return results;
}
