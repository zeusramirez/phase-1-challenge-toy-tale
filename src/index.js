let addToy = false;
let toyUrl = ' http://localhost:3000/toys'
let toyDiv = document.querySelector('#toy-collection')
let newToyForm = document.querySelector('form.add-toy-form')

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
// initial fetch
fetch(toyUrl).then(res => res.json()).then(data => loadToys(data))

// event listeners
newToyForm.addEventListener('submit', e=> addNewToy(e))
// functions

// This function creates a new toy 
// card when called upon
function renderToy(toysInfo){
  {
    let loadToyCards = document.createElement('div')
    loadToyCards.className = 'card'
    // create/ load img
    let loadToyImg = document.createElement('img')
    loadToyImg.src = toysInfo.image
    loadToyImg.className = 'toy-avatar'
    loadToyImg.alt = toysInfo.name 
    // create/load toy name
    let loadToyName  = document.createElement('h2')
    loadToyName.textContent = toysInfo.name
    // create/load likes
    let toyLikes = document.createElement('p')
    toyLikes.textContent = `${toysInfo.likes} likes`
    // create button inside div
    let toyBtn = document.createElement('button')
    toyBtn.className = 'like-btn'
    toyBtn.id = toysInfo.id
    toyBtn.textContent = 'Like'
    toyBtn.addEventListener('click', e => addLike(e))
    function addLike(e){
      let toyId = e.target.id
      newLike = toysInfo.likes +=1
      updateLikes(toyId)
      toyLikes.textContent = `${newLike} likes`
    }


    // append data
    loadToyCards.append(loadToyImg, loadToyName, toyLikes, toyBtn)
    toyDiv.append(loadToyCards)

  }
}
//This function loads all toys
//inside json file when page loads
function loadToys(data){
  data.forEach(toysInfo => renderToy(toysInfo))
}
//This function sends submitted form
//to json file and updates the DOM
function addNewToy(e){
  e.preventDefault()
  
  let name =  e.target[0].value
  let image = e.target[1].value
  let addedToy = {name: name, image: image, likes: 0}

  fetch(toyUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(addedToy)
  }).then(res => res.json()).then(toysInfo => renderToy(toysInfo) )
}
//This function updates the likes when the
//'like' button is clicked (first updates json then DOM)
function updateLikes(toyId){
fetch(`${toyUrl}/${toyId}`, {
  method: 'PATCH',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({likes: newLike})
}).then(res => res.json()).then(data => console.log(data))
//function liveLikes(data => ){}

}

});
