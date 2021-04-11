const auth = "563492ad6f91700001000001e74ab2811e314eddad39bc7387fc1fc8"

const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input')
const submitButton = document.querySelector('.submit-btn')
const form = document.querySelector('.search-form')

let searchValue

searchInput.addEventListener('input', updateInput)

function updateInput(e) {
	searchValue = e.target.value

}


form.addEventListener('submit', (e) => {
	e.preventDefault()
	searchPhotos(searchValue)
})


function clear() {
	gallery.innerHTML = ''
	searchInput.value = ''
}


async function dataFetch(url) {
	const getData = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: auth
		}
	})

	const data = await getData.json()
	return data

}

function showImage(data) {
	clear()
	data.photos.forEach(photo => {
		const galleryImage = document.createElement('div')
		galleryImage.classList.add('gallery-image')
		galleryImage.innerHTML = `<img src=${photo.src.landscape}></img>
		<p>${photo.photographer}</p>`
		gallery.appendChild(galleryImage)
	})
}


async function curatedPhotos() {
	const data = await dataFetch('https://api.pexels.com/v1/curated?per_page=15&page=1')

	showImage(data)
}

async function searchPhotos(query) {
	const data = await dataFetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`)

	showImage(data)
}

curatedPhotos()