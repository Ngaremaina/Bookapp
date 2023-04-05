const fetchData = () => {
    return fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {
        listBooks(data)
        // inputData(data)
        getInputData(data)

    })
}


const getInputData = (value) => {
    let form = document.querySelector(".search")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let searchname = document.querySelector("#searchname").value
        let arr = Object.entries(value)
        arr.filter(element => {
          
            if (element[1].title.toLowerCase().includes(searchname)){
                console.log(element[1].title)
                let result = element[1]
               
                let parentContainer = document.querySelector(".searchresults")
                let card  = document.createElement("div")
                let container = document.createElement("div")
                let buttons = document.createElement("div")
            
                card.setAttribute("class", "card")
                container.setAttribute("class", "container")
                buttons.setAttribute("class", "buttons")
            
                let title = document.createElement("p")
                let cover = document.createElement("img")
                let author = document.createElement("p")
                let category = document.createElement("p")
            
                let buybook = document.createElement("button")
                let deletebook = document.createElement("button")
            
                title.innerText = result.title
                cover.src = result.cover
                author.innerText = `Authors: ${result.author}`
                category.innerText = result.categories
            
                buybook.innerText = "Show Details"
                deletebook.innerText = "Delete Book"
            
                card.appendChild(cover)
                container.appendChild(title)
            
                parentContainer.appendChild(card)
                card.append(container)
                card.append(buttons)
            
                buttons.appendChild(buybook)
                buttons.appendChild(deletebook)
            
                // buybook.addEventListener("click", () => {
                //     container.appendChild(author)
                //     container.appendChild(category)
                // })
            
                // deletebook.addEventListener("click",() =>{
                //     let posId = value.id
                //     deleteBook(posId)
                // })
            }
        })
        
    })
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
    buttons.setAttribute("class", "buttons")

    let title = document.createElement("p")
    let cover = document.createElement("img")
    let author = document.createElement("p")
    let category = document.createElement("p")

    let buybook = document.createElement("button")
    let deletebook = document.createElement("button")

    title.innerText = value.title
    cover.src = value.cover
    author.innerText = `Authors: ${value.author}`
    category.innerText = value.categories

    buybook.innerText = "Show Details"
    deletebook.innerText = "Delete Book"

    card.appendChild(cover)
    container.appendChild(title)

    parentContainer.appendChild(card)
    card.append(container)
    card.append(buttons)

    buttons.appendChild(buybook)
    buttons.appendChild(deletebook)

    buybook.addEventListener("click", () => {
        container.appendChild(author)
        container.appendChild(category)
    })

    deletebook.addEventListener("click",() =>{
        let posId = value.id
        deleteBook(posId)
    })
}

const inputData = (value) => {
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let title = document.querySelector("#name").value
        let author = document.querySelector("#comment").value
        let website = document.querySelector("#website").value
        let description = document.querySelector("#description").value
        let publisher = document.querySelector("#publisher").value
        
        let id = value.id
        console.log(title)
        addBook({title},{author}, {website},{description},{publisher})
    })
}

const addBook = () => {
    let options = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(title,author,website,description,publisher)
    }
    fetch(`http://localhost:3000/books/`,options)
}

const deleteBook = (id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        
    }
    fetch(`http://localhost:3000/books/${id}`, options)
    .then(res => res.json)
}


document.addEventListener('DOMContentLoaded', fetchData)