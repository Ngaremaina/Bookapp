const fetchData = () => {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {
        listBooks(data)
    })

    inputData()
    
}

const listBooks = (value)=> {
    value.forEach(element => {
        createElements(element)   
    });
}

const createElements = (value) => {
    let parentContainer = document.querySelector(".books")
    let card  = document.createElement("div")
    let container = document.createElement("div")
    let buttons = document.createElement("div")

    card.setAttribute("class", "card")
    container.setAttribute("class", "container")

    let title = document.createElement("p")
    let cover = document.createElement("img")
    let author = document.createElement("p")

    let buybook = document.createElement("button")
    let deletebook = document.createElement("button")

    title.innerText = value.title
    cover.src = value.cover
    author.innerText = value.author

    buybook.innerText = "Buy Book"
    deletebook.innerText = "Delete Book"

    card.appendChild(cover)
    container.appendChild(title)

    parentContainer.appendChild(card)
    card.append(container)
    card.append(buttons)

    card.addEventListener("click", () => {
        container.appendChild(author)
    })
    buttons.appendChild(buybook)
    buttons.appendChild(deletebook)
}

const inputData = () => {
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let bookname = document.querySelector("#name").value
        console.log(bookname)
    })
}



document.addEventListener('DOMContentLoaded', fetchData)