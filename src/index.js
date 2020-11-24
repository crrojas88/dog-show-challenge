
const URL = ' http://localhost:3000/dogs'

// this function GETs all dogs from the db and are called within
// an iterateDogs function.
function getDogs() {
    fetch(URL)
    .then(response => (response.json()))
    .then(allDogs => iterateDogs(allDogs))
}

// iterate through the allDogs object and call createDogTable for each dog
function iterateDogs(allDogs) {
    for (dog of allDogs) {
        createDogTable(dog)
    }
}

function createDogTable(dog) {
    // grab tbody
    const tableBody = document.getElementById('table-body')
    // create a table row
    const tr = document.createElement('tr')

    // create the td and button elements and add innerText for each
    const name = document.createElement('td')
    name.innerText = dog.name
    
    const breed = document.createElement('td')
    breed.innerText = dog.breed

    const sex = document.createElement('td')
    sex.innerText = dog.sex

    // create a button wrapper then create an 'edit dog' button.
    
    const btnWrapper = document.createElement('td')
    const editBtn = document.createElement('button')
    editBtn.innerText = "Edit Dog"
    // Add an event listener to the edit button and attach a populateForm function that
    // fills the form with specific dog.
    editBtn.addEventListener("click", () => populateForm(dog))
    
    // append td's to tr
    btnWrapper.appendChild(editBtn)
    tr.append(name, breed, sex, btnWrapper)
    tableBody.appendChild(tr)
}

// this function populates form with dog info after clicking "edit dog"
function populateForm(dog) {
    // grab dogForm
    const dogForm = document.getElementById('dog-form')
    // fill corresponding form values with dog object values
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
    dogForm.dataset.id = dog.id
}

// grab form and add an event listener for a submit. Pass handleSubmit function
const form = document.getElementById('dog-form')
form.addEventListener("submit", (e) => handleSubmitForm(e))


function handleSubmitForm(e) {

    e.preventDefault()
    const dogId = e.target.dataset.id

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": e.target.name.value,
            "breed": e.target.breed.value,
            "sex": e.target.breed.value
        })
    }

    fetch(URL + `/${dogId}`,configObj)
    .then(response => response.json())
    .then(dogEdit => {

        const oldForm = document.getElementById("table-body")
        oldForm.innerText = ""
        getDogs()

    })
}

// call getDogs in order to have access to all dog objects
getDogs()
