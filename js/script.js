//Fetching data from json server
const fetchData = () => {
    return fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {
        //Declaring our functions that will be fetching data from json server
        listBooks(data)
        getSearchData(data)
    })
    
}

//Searching data from the json server
const getSearchData = (value) => {
    let form = document.querySelector("#search")
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        //Getting our value from the user 
        let searchname = document.querySelector("#searchname").value

        //Quering the HTML elements from the index file
        let parentContainer = document.querySelector(".searchresults")
        let titleContainer = document.querySelector(".resultstitle")

        //Creating the paragraph HTML element dynamically
        let text = document.createElement("p")
        text.innerText = "Search Results"

        //Appending the element in our HTML
        titleContainer.appendChild(text)
        
        //Converting our json data from an object to an array
        let arr = Object.entries(value)

        //Filtering our data using the filter function
        arr.filter(element => {

            //Comparing our book titles from the data with the book title given by the user
            if (element[1].title.toLowerCase().includes(searchname)){

                //Once successful, we can see our results from console
                console.log(element[1].title)
                let result = element[1]
                
                 //Creating the HTML elements dynamically
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
                let editbook = document.createElement("button")
                
                //Setting attributes to the buttons
                buybook.setAttribute("id","buybook")
                deletebook.setAttribute("id","deletebook")
            
                //Assigning the data values to the respective HTML elements
                title.innerText = result.title
                cover.src = result.cover
                price.innerText = `Price: Kshs. ${result.price}`
                description.innerText = result.description
                author.innerText = `by ${result.author}`
                summary.innerText = "Description"
                pages.innerText = `Pages: ${result.pages}`
                published.innerText = `Publish Date: ${result.published}`
                publisher.innerText = `Publisher: ${result.publisher}`

                //Calculating the available copies of the books and displaying to the user
                let diff = parseInt(result.quantity) - parseInt(result.sold)
                availableBooks.innerText = `Available copies: ${diff}`
                
                
                //Comparing the 
                if (diff <= 0){
                    buybook.innerText = "Sold Out"
                    buybook.disabled = true      
                }
                else{
                    buybook.innerText = "Buy Book"
                }
            
                showbook.innerText = "Show More..."
                deletebook.innerHTML = "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>"
                editbook.innerHTML = "<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>"
               
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

                editbook.addEventListener("click", () => {
                    let posId = value.id
                    let detailForm = document.createElement("details")
                    let formSummary = document.createElement("summary")
                    formSummary.innerText = "Update Book"
                    container.appendChild(detailForm)
                    detailForm.appendChild(formSummary)
                    let formContainer = document.createElement("div")
                    
                    formContainer.innerHTML = `
                    <form id="updateBook" class="updateformbook"><br>
                    <label for="title">Book Title</label>
                    <input type="text" id="title" class="form-control" placeholder="Enter the Book Title...">
                    <label for="author">Book Author</label>
                    <input type="text" id="author" class="form-control" placeholder="Enter the Book Author...">
                    <label for="price">Book Price</label>
                    <input type="number" id="price" class="form-control" placeholder="Enter the Book Price...">
                    <label for="quantity">Quantity</label>
                    <input type="number" id="quantity" class="form-control" placeholder="Enter the Number of Available Books to be Sold...">
                    <label for="sold">Books Sold</label>
                    <input type="number" id="sold" class="form-control" placeholder="Enter the Number of Books Sold...">
                    <label for="title">Book Description</label>
                    <input type="text" id="description" class="form-control" placeholder="Enter the Book Description..">
                    <label for="cover">Book Cover</label>
                    <input type="text" id="cover" class="form-control" placeholder="Enter the Book Image Link...">
                    <button type="submit">Submit</button>
                  </form>`
                    formContainer.addEventListener("submit", (event) =>{
                        event.preventDefault()
                        let title = document.getElementById("title").value
                        let subtitle = document.getElementById("title").value
                        let author = document.getElementById("author").value
                        let published = document.getElementById("published").value
                        let publisher = document.getElementById("publisher").value
                        let pages = document.getElementById("pages").value
                        let price = parseInt(document.getElementById("price").value)
                        let quantity = parseInt(document.getElementById("quantity").value)
                        let sold = parseInt(document.getElementById("sold").value)
                        let description = document.getElementById("description").value
                        let cover = document.getElementById("cover").value
                        // console.log(fname, lname, posId)
                         fetch(`http://localhost:3000/books/${posId}`,{
                            method:"PUT",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                title:title,
                                subtitle:subtitle,
                                author:author,
                                published:published,
                                publisher:publisher,
                                pages:pages,
                                price:price,
                                quantity:quantity,
                                sold:sold,
                                description:description,
                                cover:cover
                            })
                    })
                    })
                    detailForm.appendChild(formContainer)
                    return formContainer
            
                },{once : true})               
            }
          
        })     
    })
}

let bookForm = document.getElementById("bookForm");
console.log(bookForm)
bookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let title = document.getElementById("title").value
    let subtitle = document.getElementById("title").value
    let author = document.getElementById("author").value
    let published = document.getElementById("published").value
    let publisher = document.getElementById("publisher").value
    let pages = document.getElementById("pages").value
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
            subtitle:subtitle,
            author:author,
            published:published,
            publisher:publisher,
            pages:pages,
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
    let detailsComment = document.createElement("details")
    let summaryComment = document.createElement("summary")
    let commentSection = document.createElement("li")
    let name = document.createElement("p")
    let comments = document.createElement("p")


    let buybook = document.createElement("button")
    let showbook = document.createElement("a")   
    let deletebook = document.createElement("button")
    let editbook = document.createElement("button")
    let commentbutton = document.createElement("button")

    buybook.setAttribute("id","buybook")
    deletebook.setAttribute("id","deletebook")
    editbook.setAttribute("id", "editbook")
    commentbutton.setAttribute("id","commentbutton")

    title.innerText = value.title
    cover.src = value.cover
    price.innerText = `Price: Kshs. ${value.price}`
    description.innerText = value.description
    author.innerText = `by ${value.author}`
    let diff = parseInt(value.quantity) - parseInt(value.sold)
    availableBooks.innerText = `Available copies: ${diff}`
    summary.innerText = "Description"
    summaryComment.innerText = "Comments"
    pages.innerText = `Pages: ${value.pages}`
    published.innerText = `Publish Date: ${value.published}`
    publisher.innerText = `Publisher: ${value.publisher}`
    name.innerText = value.name
    comments.innerText = value.comment
    

    if (diff <= 0){
        buybook.innerText = "Sold Out"
        buybook.disabled = true      
    }
    else{
        buybook.innerText = "Buy Book"
    }

    showbook.innerText = "Show More..."
    deletebook.innerHTML = "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>"
    editbook.innerHTML = "<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>"
    commentbutton.innerHTML = "<i class=\"fa fa-comments\" aria-hidden=\"true\"></i>"

    card.appendChild(cover)
    container.appendChild(title)
    container.appendChild(price)
    container.appendChild(availableBooks)
    container.appendChild(showbook)

    

    parentContainer.appendChild(card)
    card.append(container)
    card.append(buybook)

    showbook.addEventListener("click", () => {
        container.appendChild(author)
        container.appendChild(details)
        details.appendChild(summary)
        details.appendChild(description)
        container.appendChild(publisher)
        container.appendChild(published)
        container.appendChild(pages)
        container.appendChild(buttons)
        container.appendChild(detailsComment)
        detailsComment.appendChild(summaryComment)
        detailsComment.appendChild(name)
        detailsComment.appendChild(comments)
        buttons.appendChild(editbook)
        buttons.appendChild(commentbutton)
        buttons.appendChild(deletebook)   
       
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



    editbook.addEventListener("click", () => {
        let posId = value.id
        let detailForm = document.createElement("details")
        let formSummary = document.createElement("summary")
        formSummary.innerText = "Update Book"
        container.appendChild(detailForm)
        detailForm.appendChild(formSummary)
        let formContainer = document.createElement("div")
        
        formContainer.innerHTML = `
        <form id="updateBook" class="updateformbook"><br>
        <label for="title">Book Title</label>
        <input type="text" id="title" class="form-control" placeholder="Enter the Book Title...">
        <label for="author">Book Author</label>
        <input type="text" id="author" class="form-control" placeholder="Enter the Book Author...">
        <label for="price">Book Price</label>
        <input type="number" id="price" class="form-control" placeholder="Enter the Book Price...">
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity" class="form-control" placeholder="Enter the Number of Available Books to be Sold...">
        <label for="sold">Books Sold</label>
        <input type="number" id="sold" class="form-control" placeholder="Enter the Number of Books Sold...">
        <label for="title">Book Description</label>
        <input type="text" id="description" class="form-control" placeholder="Enter the Book Description..">
        <label for="cover">Book Cover</label>
        <input type="text" id="cover" class="form-control" placeholder="Enter the Book Image Link...">
        <button type="submit">Submit</button>
      </form>`
        formContainer.addEventListener("submit", (event) =>{
            event.preventDefault()
            let title = document.getElementById("title").value
            let subtitle = document.getElementById("title").value
            let author = document.getElementById("author").value
            let published = document.getElementById("published").value
            let publisher = document.getElementById("publisher").value
            let pages = document.getElementById("pages").value
            let price = parseInt(document.getElementById("price").value)
            let quantity = parseInt(document.getElementById("quantity").value)
            let sold = parseInt(document.getElementById("sold").value)
            let description = document.getElementById("description").value
            let cover = document.getElementById("cover").value
            // console.log(fname, lname, posId)
             fetch(`http://localhost:3000/books/${posId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    title:title,
                    subtitle:subtitle,
                    author:author,
                    published:published,
                    publisher:publisher,
                    pages:pages,
                    price:price,
                    quantity:quantity,
                    sold:sold,
                    description:description,
                    cover:cover
                })
            })
        })
        detailForm.appendChild(formContainer)
        
        return formContainer

    },{once : true})


    commentbutton.addEventListener("click", () => {
        let posId = value.id
        let detailForm = document.createElement("details")
        let formSummary = document.createElement("summary")
        formSummary.innerText = "Update Book"
        container.appendChild(detailForm)
        detailForm.appendChild(formSummary)
        let formComment = document.createElement("div")
        
        formComment.innerHTML = `
        <form id="commentBook" class="updateformbook"><br>
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" placeholder="Enter Your Name...">
        <label for="comment">Comment</label>
        <input type="text" id="comment" class="form-control" placeholder="Enter Your Comment...">
        <button type="submit">Submit</button>
        
      </form>`
        formComment.addEventListener("submit", (event) =>{
            event.preventDefault()
            let name = document.getElementById("name").value
            let comment = document.getElementById("comment").value
            
             fetch(`http://localhost:3000/books/${posId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:name,
                    comment:comment,
                    
                })
        })
        })
        detailForm.appendChild(formComment)
        return formComment
    },{once : true})
    
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

