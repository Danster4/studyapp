

let comicHandler = function () {
  
    const rndInt = Math.floor(Math.random() * 1000) + 1
    console.log(rndInt)

    let comicCard = document.querySelector(".comicCard")

    let apiComicUrl = "https://xkcd.com/" + rndInt + "/info.0.json"
    console.log("hi")
    fetch(apiComicUrl)
      // Convert the response to JSON
      .then(function(data) {
        return data.json();
      })
        .then(function(data) {
          // create image icon for Day +3 Card
          var comicEl = document.createElement('img')
          var comicCode = data.img
          // comicEl.src = "http://openweathermap.org/img/w/" + comicCode + ".png";
          comicEl.innerHTML = data.img
          comicCard.appendChild(comicEl);
        });

}

document.querySelector('#comicButton').addEventListener('submit', comicHandler);
