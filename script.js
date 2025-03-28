let books = [];
let allBooks= []
async function fetchAll() {
  const url = `https://api.freeapi.app/api/v1/public/books?page=1&$limit=200&query=tech`
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
  } catch (error) {
    console.log(error);
  }
}
fetchBooks(20);

function render(books) {
  let booksElement= books.map((book, index) => {
    const title = book.volumeInfo.title
    const thumb = book.volumeInfo.imageLinks.thumbnail
    const link = book.volumeInfo.infoLink
        return `<a href="${link}">
                <div class="book" id="${index}">
                    <div class="thumb">
                        <img src="${thumb} alt="book-thumb">
                    </div>
                    <div class="details">
                        <span class="title">${title}</span>
                        <span class="author">By</span>
                    </div>
                    <div class="publisher-details">
                        <span id="publisher">Sybex</span>
                        <span>⦁</span>
                        <span id="published-date">2004-05-07</span>
                    </div>
                </div>
            </a>`;
      })
      .join("");

  document.getElementById("container").innerHTML = booksElement;
  switchView()
}

setTimeout(()=>render(books), 1000)


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

function sortBooks() {}

function search() {
  document.getElementById('searchh').addEventListener('input',(event)=>{
     const searchTerm = event.target.value.toLowerCase();
     const filteredData = data.filter((user) =>
       user.name.toLowerCase().includes(searchTerm)
     );
  })
}
