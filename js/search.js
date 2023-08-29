const url = 'https://youtube138.p.rapidapi.com/channel/search/?id=UCJ5v_MCY6GNUBTO8-D3XoAg&q=%5BBUSCARAQUI%5D&hl=en&gl=US';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '04d10ecdc5msh4b532459d726b25p18321djsn81474e7848e5',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}