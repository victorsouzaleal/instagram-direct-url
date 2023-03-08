const axios = require('axios');

/** 
 * This function intakes an instagramUrl of an image or video post, reel, or public account stories using InstaSuperSave API.
 * @param {string} instagramUrl - The Instagram URL to convert.
 * @returns {Promise<Array<{fileExtension: string, rawUrl: string}> | string>} An array of objects containing fileExtension and rawUrl properties, If the API call fails, returns error message with additional information.
 */
async function instagramGetUrl(instagramUrl) {
    const api = 'https://instasupersave.com';
	// Collect cookie from session.
	try {
		const {
			headers: { 'set-cookie': cookie }
		} = await axios(api);
		const session = String(cookie[0].split(';')[0]).replace('XSRF-TOKEN=', '').replace('%3D', '');

		// Setup request headers.
		const requestHeaders = {
			method: 'POST',
			url: `${api}/api/convert`,
			headers: {
				'Origin': api,
				'Referer': `${api}/pt/`,
				'Sec-Fetch-Dest': 'empty',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Site': 'same-origin',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
				'X-XSRF-Token': session,
				'Content-Type': 'application/json',
				'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`
			},
			data: { url: instagramUrl }
		};

		// Call the API and process the data.
		const { data } = await axios(requestHeaders);
		return data.map(({ url }) => {
			const { ext: fileExtension, url: rawUrl } = url[0];
			return { fileExtension, rawUrl };
		});
	} catch (error) {
		return (await import('util')).format(
			'[instagram-direct-url] %s (Status: %s, Status Text: %s)', 
			error?.message || 'An error occurred.', 
			error?.response?.status || 'None', 
			error?.response?.statusText || 'None'
		);
	}
}

module.exports = instagramGetUrl;
