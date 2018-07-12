const splashOne = document.querySelector('#splashOne')
const splashTwo = document.querySelector('#splashTwo')
const splashThree = document.querySelector('#splashThree')
const albumScroller = document.querySelector('.album-scroller')
const addAlbums = document.querySelector('.addAlbums')
const clearTracks = document.querySelector('.clear-tracks')
const submitBin = document.querySelector('.submit-bin')
const postResponse = document.querySelector('#postResponse')

window.addEventListener('load', () => {
  axios.get('https://lit-fortress-6467.herokuapp.com/object ')
    .then(response => {
      const data = response.data.results
      splashOne.src = `images/${data[0].cover_art}`
      splashTwo.src = `images/${data[2].cover_art}`
      splashThree.src = `images/${data[3].cover_art}`
    })
})

window.addEventListener('load', () => {
  axios.get('https://lit-fortress-6467.herokuapp.com/object')
    .then(response => {
      const data = response.data.results
      console.log(response)
      for(let i=0; i<data.length; i++) {
        albumScroller.innerHTML += `<div class='album_container'><img id='${i}' class='album' src=images/${data[i].cover_art}></div>`
      }
    })
})

albumScroller.addEventListener('click', (e) => {
  axios.get('https://lit-fortress-6467.herokuapp.com/object')
    .then(response => {
      const data = response.data.results
      addAlbums.innerHTML += `<p>${data[(e.target).id].artist}: ${data[(e.target).id].title}</p><hr>`
    })
})

clearTracks.addEventListener('click', () => {
  addAlbums.innerHTML = ''
})

submitBin.addEventListener('click', () => {
  axios.post('https://lit-fortress-6467.herokuapp.com/post',
  {
    addAlbums: addAlbums.textContent
  })
    .then(response => {
      postResponse.style.backgroundColor = 'hsl(140, 50%, 50%)'
      postResponse.style.animationName = 'fadeIn'
      postResponse.style.animationDuration = '3s';
      postResponse.textContent = `playlist submitted successfully!`
      setTimeout(function() {
        postResponse.style.animationName = ''
        postResponse.style.animationDuration = '';
      }, 3000)
    })
})
