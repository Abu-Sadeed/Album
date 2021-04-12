const auth = "563492ad6f91700001000001e74ab2811e314eddad39bc7387fc1fc8"

const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input')
const submitButton = document.querySelector('.submit-btn')
const form = document.querySelector('.search-form')
const next = document.querySelector('.next-btn')
const prev = document.querySelector('.prev-btn')
let pageNum = 1

let searchValue
let currentSearch

searchInput.addEventListener('input', updateInput)
next.addEventListener('click', updateNext)
prev.addEventListener('click', updatePrev)

function updateNext(e) {
	e.preventDefault()
	pageNum++
	if (currentSearch) {
		searchPhotos(currentSearch, pageNum)
	} else {
		curatedPhotos(pageNum)
	}

}

function updatePrev(e) {
	e.preventDefault()
	if (pageNum <= 1) {
		pageNum = 1
	} else {
		pageNum--
	}

	if (currentSearch) {
		searchPhotos(currentSearch, pageNum)
	} else {
		curatedPhotos(pageNum)
	}
}

function updateInput(e) {
	searchValue = e.target.value

}


form.addEventListener('submit', (e) => {
	e.preventDefault()
	currentSearch = searchValue
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
		<div class='photo-info'>
		<p>${photo.photographer}</p>
		<button>
			<a href=${photo.src.original} class='button'>Download</a>
		</button>
		</div>`
		gallery.appendChild(galleryImage)
	})
}


async function curatedPhotos(pageNum) {
	const data = await dataFetch(`https://api.pexels.com/v1/curated?per_page=15&page=${pageNum}`)

	showImage(data)
}

async function searchPhotos(query, pageNum) {
	const data = await dataFetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${pageNum}`)

	showImage(data)
}

curatedPhotos(pageNum)