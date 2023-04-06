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

                buybook.setAttribute("id","buybook")
                deletebook.setAttribute("id","deletebook")
            
                card.appendChild(cover)
                container.appendChild(title)
            
                parentContainer.appendChild(card)
                card.append(container)
                card.append(buttons)
            
                buttons.appendChild(buybook)
                buttons.appendChild(deletebook)

                buybook.addEventListener('click', () => {
                    value.sold ++
                    let sold = value.sold
                    let posId = value.id
                    console.log(sold, posId)
                    updateTicketNum(posId, {sold})      
                })
            
                deletebook.addEventListener("click", () => { 
                    let posId = value.id
                    deleteBook(posId)
                })
            
                
            }
            else{
                

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

    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let price = parseInt(document.getElementById("price").value)
    let quantity = parseInt(document.getElementById("quantity").value)
    let sold = parseInt(document.getElementById("sold").value)
    let description = document.getElementById("description").value
    let cover = document.getElementById("cover").value

    // console.log(isbn,title,subtitle,author,published,publisher,pages,description,cover)

    fetch("http://localhost:3000/books/",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({
            title:title,
            author:author,
            price:price,
            quantity:quantity,
            sold:sold,
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
    let price = document.createElement("p")
    let description = document.createElement("p")
    let availableBooks = document.createElement("p")
    let author = document.createElement("p")
    let details = document.createElement("details")
    let summary = document.createElement("summary")
    let pages = document.createElement("p")
    let published = document.createElement("p")
    let publisher = document.createElement("p")


    let buybook = document.createElement("button")
    let showbook = document.createElement("a")
    let deletebook = document.createElement("button")

    buybook.setAttribute("id","buybook")
    deletebook.setAttribute("id","deletebook")

    title.innerText = value.title
    cover.src = value.cover
    price.innerText = `Price: Kshs. ${value.price}`
    description.innerText = value.description
    author.innerText = `by ${value.author}`
    let diff = parseInt(value.quantity) - parseInt(value.sold)
    availableBooks.innerText = `Available copies: ${diff}`
    summary.innerText = "Description"
    pages.innerText = `Pages: ${value.pages}`
    published.innerText = `Publish Date: ${value.published}`
    publisher.innerText = `Publisher: ${value.publisher}`

    if (diff <= 0){
        buybook.innerText = "Sold Out"
        buybook.disabled = true      
    }
    else{
        buybook.innerText = "Buy Book"
    }

    showbook.innerText = "Show More..."
    deletebook.innerHTML = "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>"

    card.appendChild(cover)
    container.appendChild(title)
    container.appendChild(price)
    container.appendChild(availableBooks)
    container.appendChild(showbook)

    parentContainer.appendChild(card)
    card.append(container)
    card.append(buttons)

    buttons.appendChild(buybook)
    // buttons.appendChild(showbook)

    showbook.addEventListener("click", () => {
        container.appendChild(author)
        container.appendChild(details)
        details.appendChild(summary)
        details.appendChild(description)
        container.appendChild(publisher)
        container.appendChild(published)
        container.appendChild(pages)
        // container.appendChild(description)
        container.appendChild(deletebook)
    
    })
    buybook.addEventListener('click', () => {
        value.sold ++
        let sold = value.sold
        let posId = value.id
        console.log(sold, posId)
        updateTicketNum(posId, {sold})      
    })

    deletebook.addEventListener("click", () => { 
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
const updateTicketNum = (id, value) =>{
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(value)
    }
    fetch(`http://localhost:3000/books/${id}`, options)
    .then(res => res.json)
}


document.addEventListener('DOMContentLoaded', fetchData)

