const fetchData = () => {
    // addBook()
    return fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {
        listBooks(data)
        getSearchData(data)
    })
    
}


const getSearchData = (value) => {
    let form = document.querySelector("#search")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let searchname = document.querySelector("#searchname").value
        let parentContainer = document.querySelector(".searchresults")
        let arr = Object.entries(value)
        arr.filter(element => {
            if (element[1].title.toLowerCase().includes(searchname)){
                console.log(element[1].title)
                let result = element[1]
        
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
        // let errormessage = document.createElement("li");
        // // errormessage.innerText = `Cannot get the book containing the word ${searchname}`
        // // parentContainer.appendChild(errormessage)
        // errormessage.innerHTML = `
        // <p>Cannot get the book containing the word ${searchname}</p>`
        // parentContainer.appendChild(errormessage)
        
    })
}

let bookForm = document.getElementById("bookForm");
console.log(bookForm)
bookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let isbn = document.getElementById("isbn").value
    let title = document.getElementById("title").value
    let subtitle = document.getElementById("subtitle").value
    let author = document.getElementById("author").value
    let published = document.getElementById("published").value
    let publisher = document.getElementById("publisher").value
    let pages = document.getElementById("pages").value
    let description = document.getElementById("description").value
    let cover = document.getElementById("cover").value

    console.log(isbn,title,subtitle,author,published,publisher,pages,description,cover)

    fetch("http://localhost:3000/books/",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({
            isbn:isbn,
            title:title,
            subtitle:subtitle,
            author:author,
            published:published,
            publisher:publisher,
            pages:pages,
            description:description,
            cover:cover
        })
    })
})


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

