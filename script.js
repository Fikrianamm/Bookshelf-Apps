const title =  document.querySelector("#judul")
const author = document.querySelector("#penulis")
const year = document.querySelector("#tahun")
const isComplete = document.querySelector("#unread")
const formAddBook = document.querySelector(".form-addBook")
const editTitle = document.querySelector(".edit")
const updateBtn = document.querySelector(".update")
const hiddenCol = document.querySelectorAll(".col")

let statusEdit = false
let search = false
let books = []
let searchBooks = []
const RENDER_EVENT = "render"

formAddBook.addEventListener("submit",()=>{ 
    if(statusEdit == false)handleAddBook(event) 
    return
})

function generateId(){
    const id = Date.now()
    return id
}

class Book{
    constructor(title,author,year,isComplete){
        this.id = generateId()
        this.title = title
        this.author = author
        this.year = year
        this.isComplete = isComplete
    }
}

function makeElement(bookObject){
    const {id, title, author, year, isComplete} = bookObject
    const titleText = document.createElement("h3")
    titleText.innerText = title

    const labelAuthor = document.createElement("p")
    labelAuthor.classList.add("label")
    labelAuthor.innerText = "Penulis"  
    
    const authorText = document.createElement("p")
    authorText.classList.add("semiBold")
    authorText.innerText = author
    
    
    const labelYear = document.createElement("p")
    labelYear.classList.add("label")
    labelYear.innerText = "Tahun Terbit"  
    
    const yearText = document.createElement("p")
    yearText.classList.add("semiBold")
    yearText.innerText = year

    const btnEdit = document.createElement("button")
    btnEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/></svg>'
    btnEdit.setAttribute("title","Edit")

    const btnHapus = document.createElement("button")
    btnHapus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg>'
    btnHapus.setAttribute("title","Hapus")

    const toggleBtn = document.createElement("button")
    isComplete ? toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-x" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/></svg>' : toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/></svg>'
    isComplete ? toggleBtn.setAttribute("title","Belum Selesai dibaca") : toggleBtn.setAttribute("title","Selesai dibaca")

    const containerBtn = document.createElement("div")
    containerBtn.classList.add("btnGroup")
    
    containerBtn.append(btnEdit,btnHapus,toggleBtn)

    const container = document.createElement("div")
    isComplete ? container.classList.add("completed") : container.classList.add("uncompleted")
    container.append(titleText,labelAuthor,authorText,labelYear,yearText,containerBtn)
    container.setAttribute('id', id);

    btnEdit.addEventListener("click", ()=>editBook(id))
    btnHapus.addEventListener("click", ()=>removeBook(id))
    toggleBtn.addEventListener("click",()=>toggleComplete(id))

    return container
}

document.addEventListener(RENDER_EVENT,()=>{
    const uncompleted = document.querySelector(".belum-selesai")
    const completed = document.querySelector(".selesai")
    
    uncompleted.innerHTML = ""
    completed.innerHTML = ""
    
    if(search){
        for (const book of searchBooks) {
            const child = makeElement(book) 
            if(book.isComplete){
                completed.append(child)
            }else{
                uncompleted.append(child)
            }
        }
        search = false
    }else{
        for (const book of books) {
            const child = makeElement(book) 
            if(book.isComplete){
                completed.append(child)
            }else{
                uncompleted.append(child)
            }
        }
    }
    
})

function handleAddBook(e){
    e.preventDefault();

    const data = new Book(title.value,author.value,year.value,isComplete.checked)
    books.push(data)
    
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
    emptyForm()
}

function emptyForm(){
    title.value = ""
    author.value = ""
    year.value = null
    isComplete.checked = false
}

function saveData(){
    if(typeof(Storage) !== undefined){
        const result = JSON.stringify(books)
        localStorage.setItem("Books",result)
        return true
    }else{
        alert("Sorry! No Web Storage support..")
        return false
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    
    const getData = localStorage.getItem("Books")
    if(getData){
        const booksParse = JSON.parse(getData)  
        books = booksParse
    }else{
        console.log("Data not found");
    }
    document.dispatchEvent(new Event(RENDER_EVENT))
    return books
})

function editBook(id){
    statusEdit = true
    hiddenCol[1].style.display = "none"
    
    editTitle.innerText = "Edit Buku"
    updateBtn.innerText = "Update"
    
    const bookSelected = findBook(id)
    title.value = bookSelected.title
    author.value = bookSelected.author
    year.value = bookSelected.year
    isComplete.checked = bookSelected.isComplete
    formAddBook.addEventListener("submit",()=>{
        statusEdit = false
        editTitle.innerText = "Masukkan Buku Baru"
        updateBtn.innerText = "Tambah Buku"
        hiddenCol[1].style.display = "block"
        document.dispatchEvent(new Event(RENDER_EVENT))

        bookSelected.title = title.value 
        bookSelected.author = author.value 
        bookSelected.year = year.value 
        bookSelected.isComplete = isComplete.checked 
        saveData()
    })
}

function findBook(id){
    const book = books.find((book)=> book.id == id)
    if(book)return book;
    return null
}

function findIndexBook(id){
    for (const index in books) {
        if(books[index].id === id ) return index
    }
    return -1    
}

function removeBook(id){
    console.log(findIndexBook(id));
    const indexBook = findIndexBook(id)

    if(indexBook === -1) return

    books.splice(indexBook,1)
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
}

function toggleComplete(id){
    const bookSelected = findBook(id)
    bookSelected.isComplete = !bookSelected.isComplete
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
}

function handleSearch(e){
    e.preventDefault()
    const searchResult = books.filter(book => book.title.toLowerCase().includes(cari.value.toLowerCase()));
    searchBooks = searchResult
    search = true
    document.dispatchEvent(new Event(RENDER_EVENT))
}
