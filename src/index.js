let addToy = false;
let toyCollection = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyArr => {
    toyArr.forEach(toy => makeCard(toy))
    let form = document.querySelector('form')
    form.addEventListener('submit', addCard)
  })


let form = document.querySelector('form')
form.addEventListener('submit', addCard)

function addCard(e) {
  e.preventDefault()
  let toyName = document.getElementsByClassName("input-text")[0].value
  let imgUrl = document.getElementsByClassName("input-text")[1].value
  let newCard = { name: toyName,
    image: imgUrl ,
    likes : 0 ,
  }
    makeCard(newCard)
    postCard(newCard)
}


function makeCard(toy) {
  let div = document.createElement('div')
        div.classList = "card"
        div.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>`
        toyCollection.appendChild(div)
  div.addEventListener('click', () =>{
    toy.likes ++
    div.querySelector('p').textContent =  `${toy.likes} Likes`
  })
}

function postCard(newCard){
  fetch('http://localhost:3000/toys',{
  method: "POST"  ,
  headers: {
  "Content-Type": "application/json",
  Accept: "application/json"
} ,
  body: JSON.stringify(newCard)
})}

function updateLikes(e){
  fetch(`http://localhost:3000/toys/:${e.target.id}`,{
    method : 'PATCH' ,
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    } ,
    body : JSON.stringify(newCard)
  })
}
