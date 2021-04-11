const auth = "563492ad6f91700001000001e74ab2811e314eddad39bc7387fc1fc8"

const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input')
const submitButton = document.querySelector('.submit-btn')

let searchValue

async function curatedPhotos() {
	const getData = await fetch('https://api.pexels.com/v1/curated?per_page=15&page=1', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: auth
		}
	})

	const data = await getData.json()

	data.photos.forEach(photo => {
		const galleryImage = document.createElement('div')
		galleryImage.classList.add('gallery-image')
		galleryImage.innerHTML = `<img src=${photo.src.landscape}></img>
		<p>${photo.photographer}</p>`
		gallery.appendChild(galleryImage)
	})
}

curatedPhotos()