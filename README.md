# Books Library

## Objective

The Books Library is a web application that dynamically fetches and displays book data from the FreeAPI.app. This project helps in practicing API requests, handling JSON data, and rendering dynamic content using JavaScript.

## Features

- Fetch books from the API and display them in a **list** or **grid** view.
- Allow users to switch between list and grid layouts.
- Display book details including **title, author, publisher, published date,** and **thumbnail**.
- Implement a search bar to filter books by **title** or **author**.
- Provide a sorting feature to arrange books in:
  - **Alphabetical order (A-Z) based on title**
  - **Published date (newest to oldest)**
- Implement pagination to fetch and display additional books as the user scrolls.
- Clicking on a book item opens detailed information in a **new tab** using `infoLink`.

## Technologies Used

- **HTML, CSS, JavaScript**
- **Fetch API** for retrieving book data dynamically

## API Endpoint

- **GET** `https://api.freeapi.app/api/v1/public/books`
- API Documentation: [FreeAPI Guide](https://freeapi.hashnode.space/api-guide/apireference/getBooks)

## Installation & Setup

1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/books-library.git
   ```
2. Navigate to the project folder:
   ```sh
   cd books-library
   ```
3. Open `index.html` in your browser.

## Usage

Live Deploy link - https\://books-paglu-library.netlify.app/

1. The application fetches and displays a list of books automatically.
2. Click on a book to open more details in a new tab.
3. Use the **search bar** to find books by title or author.
4. Sort books alphabetically or by published date.
5. Switch between **list** and **grid** views.
6. Pagination loads more books as you scroll.

## Future Enhancements

- Add user authentication for personal book lists.
- Implement a favorites feature to save books for later.
- Improve UI with animations and dark mode.

## Contributing

Feel free to fork this repository and submit pull requests for improvements!

## License

This project is open-source and available under the MIT License.

