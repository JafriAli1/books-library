let books = JSON.parse(localStorage.getItem("allBooks")) || [];
let allBooks = JSON.parse(localStorage.getItem("allBooks")) || [];
async function fetchAll() {
  const url =
    "https://api.freeapi.app/api/v1/public/books?page=1&limit=20&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech";
  const options = { method: "GET", headers: { accept: "application/json" } };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const x = await response.json();
    allBooks = x.data.data;
    localStorage.setItem("allBooks", JSON.stringify(allBooks))
  } catch (error) {
    console.log(error);
  }
}
fetchAll();

async function fetchBooks(limit) {
  const url =
    `https://api.freeapi.app/api/v1/public/books?page=1&limit=${limit}&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech`;
  const options = { method: "GET", headers: { accept: "application/json" } };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const x = await response.json();
    books = x.data.data;
    localStorage.setItem("allBooks", JSON.stringify(books));
  } catch (error) {
    console.log(error);
  }
}

if(books.length==0){
  fetchBooks(20).then(() => {
    render(books);
  });
}
else{
  render(books)
}



function render(books) {
  let booksElement= books.map((book, index) => {
    const title = book.volumeInfo.title
    const thumb = book.volumeInfo.imageLinks.thumbnail
    const link = book.volumeInfo.infoLink
    const author = book.volumeInfo.authors || ["Unknown"]
    const publisher = book.volumeInfo.publisher
    const date = book.volumeInfo.publishedDate
        return `<a href="${link}" target="_blank" rel="noopener noreferrer">
                <div class="book" id="${index}">
                    <div class="thumb">
                        <img src="${thumb} alt="book-thumb">
                    </div>
                    <div class="details">
                        <span class="title">${title}</span>
                        <span class="author">By ${author[0]}</span>
                    </div>
                    <div class="publisher-details">
                        <p id="publisher">${publisher}</p>
                        
                        <p id="published-date">${date}</p>
                    </div>
                </div>
            </a>`;
      })
      .join("");

  document.getElementById("container").innerHTML = booksElement;
  switchView()
}

function switchView() {
  if (document.querySelector('input[id="grid"]').checked) {
    document.getElementById("container").classList.remove("list");
    document.querySelectorAll(".book").forEach((element) => {
      element.classList.remove("book-list");
    });
    localStorage.setItem("view", "grid");
  }
  if (document.querySelector('input[id="list"]').checked) {
    document.getElementById("container").classList.add("list");
    document.querySelectorAll(".book").forEach((element) => {
      element.classList.add("book-list");
    });
    localStorage.setItem("view", "list");
  }
}

//set view according to last chosen value
if (localStorage.getItem("view") == "list") {
  document.getElementById("grid").checked = false;
  document.getElementById("list").checked = true;
  switchView();
}
//add event listener to change view
document.querySelectorAll("input[name=view_style]").forEach((element) => {
  element.addEventListener("change", () => {
    switchView();
  });
});


//search
document.getElementById("search").addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredData = allBooks.filter((book) =>
    book.volumeInfo.title.toLowerCase().includes(searchTerm)
  );

  render(filteredData);
});

//sort
document.getElementById('sort').addEventListener('change', (event)=>{
  let sortedBooks
  if(event.target.value=='alphabet'){
      sortedBooks = sortBooks("alphabet");
    }
  else if (event.target.value == "date") {
    sortedBooks = sortBooks("date");
    sortedBooks.reverse()
  }
  else{
    return render(books)
  }
  render(sortedBooks)
})


function sortBooks(type) {
  // Creating a new sorted array without modifying the original array

  const sortedBooks = [...books].sort((a, b) => {
    const titleA = a.volumeInfo.title.toLowerCase();
    const titleB = b.volumeInfo.title.toLowerCase();
    const dateA = a.volumeInfo.publishedDate || "0000-00-00"; // Handle missing date
    const dateB = b.volumeInfo.publishedDate || "0000-00-00";

    //sort by title
    if(type =="alphabet"){
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
    } else if(type == "date"){
      return new Date(dateA) - new Date(dateB);
    } 
    else{
      return books
    }   
  });
  return sortedBooks;
}