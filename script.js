const splashOne = document.querySelector('#splashOne')
const splashTwo = document.querySelector('#splashTwo')
const splashThree = document.querySelector('#splashThree')
const albumScroller = document.querySelector('.album-scroller')
const clearTracks = document.querySelector('.clear-tracks')
const submitBin = document.querySelector('.submit-bin')
const postResponse = document.querySelector('#postResponse')
const currentAlbum = document.querySelector('.currentAlbum')
const trackList = document.querySelector('.trackList')
const playlistBin = document.querySelector('.playlistBin')
const playlistBin2 = document.querySelector('.playlistBin2')

window.addEventListener('load', () => {
  axios.get('http://localhost:3000/posts')
    .then(response => {
      const data = response.data
      let arr = []
      for(let i=0; i<data.length; i++) {
        arr.push(i)
      }
      let randOne = arr[Math.floor(Math.random()*(arr.length))]
      arr.splice(arr.indexOf(randOne), 1)
      let randTwo = arr[Math.floor(Math.random()*(arr.length))]
      arr.splice(arr.indexOf(randTwo), 1)
      let randThree = arr[Math.floor(Math.random()*(arr.length))]
      arr.splice(arr.indexOf(randThree), 1)
      splashOne.src = `${data[randOne].image}`
      splashTwo.src = `${data[randTwo].image}`
      splashThree.src = `${data[randThree].image}`
    })
})

window.addEventListener('load', () => {
  axios.get('http://localhost:3000/posts')
    .then(response => {
      const data = response.data
      for(let i=0; i<data.length; i++) {
        albumScroller.innerHTML += `<div class='album_container'><img id='${i}' class='album' src=${data[i].image}></div>`
      }
    })
})

albumScroller.addEventListener('click', (e) => {
  axios.get('http://localhost:3000/posts')
    .then(response => {
      const data = response.data
      currentAlbum.style.paddingTop = '0px'
      currentAlbum.innerHTML = `<p>Add tracks from:<br><b>${data[(e.target).id].author}: ${data[(e.target).id].title}</b></p><img class='albumChoice' src='${data[(e.target).id].image}'<hr>`
      let list = `<h4 class='boxTitle'>Album Songs</h4>`
      for(let i=0; i<data[(e.target).id].songs.length; i++) {
        list += `<p>${data[(e.target).id].songs[i]}<hr></p>`
      }
      trackList.innerHTML = list;
    })
})

trackList.addEventListener('click', (e) => {
  if (e.target.tagName === 'P') {
    let newSong = document.createElement("P")
    let line = document.createElement("HR")
    newSong.textContent = e.target.textContent
    playlistBin2.prepend(line)
    playlistBin2.prepend(newSong)
  }
})

clearTracks.addEventListener('click', () => {
  playlistBin2.innerHTML = ''
})

submitBin.addEventListener('click', () => {
  axios.post('https://lit-fortress-6467.herokuapp.com/post',
  {
    addAlbums: playlistBin.textContent
  })
    .then(response => {
      postResponse.style.backgroundColor = 'hsl(140, 50%, 50%)'
      postResponse.style.animationName = 'fadeIn'
      postResponse.style.animationDuration = '3s';
      postResponse.textContent = `playlist submitted successfully!`
      playlistBin2.innerHTML = ''
      setTimeout(function() {
        postResponse.style.animationName = ''
        postResponse.style.animationDuration = '';
      }, 3000)
    })
})
