// Imports the necessary modules and types
import axios, {type AxiosResponse} from "axios";
import dotenv from "dotenv";
import express, {type Express, type Request, type Response} from "express";
import pg, {type Pool, type PoolConfig, type QueryResult} from "pg";
import type {BookEntry} from "./types";

/**
 * Initializes the Express application
 */
const app: Express = express();
/**
 * Initializes the port number for the server
 */
const port: number = 3000;

// Loads environment variables from a .env file
dotenv.config();

/**
 * Initializes the database configuration
 */
const db_config: PoolConfig = {
    connectionString: process.env.DATABASE_URL
};

/**
 * Initializes the database connection
 */
const db: Pool = new pg.Pool(db_config);

/**
 * Initializes the sort type for book entries
 */
let bookSortType: string = "id";

/**
 * Initializes the array to store book entries
 */
let books: BookEntry[] = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * Renders the home page and displays the book entries
 * @param _req The request object
 * @param res The response object
 */
async function getHomePage(_req: Request, res: Response): Promise<void>
{
    try
    {
        let result: QueryResult<BookEntry> = await db.query(
            `SELECT * FROM books ORDER BY ${bookSortType}`
        );

        books = result.rows;

        res.render("index.ejs", {books: books});
    }
    catch (error)
    {
        console.log(error);

        res.render("index.ejs");
    }
}

/**
 * Sorts the book entries by title
 * @param _req The request object
 * @param res The response object
 */
function sortByTitle(_req: Request, res: Response): void
{
    bookSortType = "title";

    res.redirect("/");
}

/**
 * Sorts the book entries by date
 * @param _req The request object
 * @param res The response object
 */
function sortByDate(_req: Request, res: Response): void
{
    bookSortType = "date";

    res.redirect("/");
}

/**
 * Sorts the book entries by rating
 * @param _req The request object
 * @param res The response object
 */
function sortByRating(_req: Request, res: Response): void
{
    bookSortType = "rating";

    res.redirect("/");
}

/**
 * Retrieves the cover image URL for a book title
 * @param title The title of the book
 * @returns The cover image URL
 */
async function getCoverImgURL(title: string): Promise<string>
{
    try
    {
        const response: AxiosResponse = await axios.get(
            `https://openlibrary.org/search.json?title=${title}`
        );

        const cover_edition_key: string = response.data.docs[0].cover_edition_key;

        return `https://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`;
    }
    catch (error)
    {
        console.log(error);

        return "";
    }
}

/**
 * Renders the add book page
 * @param _req The request object
 * @param res The response object
 */
function getAddBookPage(_req: Request, res: Response): void
{
    res.render("book.ejs");
}

/**
 * Adds a book entry to the database
 * @param req The request object
 * @param res The response object
 */
async function addBookEntry(req: Request, res: Response): Promise<void>
{
    const formData: Omit<BookEntry, "id" | "cover_img_src"> = req.body;

    try
    {
        const cover_img_url: string = await getCoverImgURL(formData.title);

        await db.query("INSERT INTO books (title, rating, date, notes, cover_img_src) VALUES ($1, $2, $3, $4, $5)",
            [formData.title, formData.rating, formData.date, formData.notes, cover_img_url]
        );

        res.redirect("/");
    }
    catch (error)
    {
        console.log(error);

        res.redirect("/add");
    }
}

/**
 * Renders the edit book page
 * @param req The request object
 * @param res The response object
 */
function getEditBookPage(req: Request, res: Response): void
{
    const formData: Omit<BookEntry, "cover_img_src"> = req.body;

    res.render("book.ejs", {data: formData});
}

/**
 * Edits a book entry in the database
 * @param req The request object
 * @param res The response object
 */
async function editBookEntry(req: Request, res: Response): Promise<void>
{
    const formData: Omit<BookEntry, "cover_img_src"> = req.body;

    try
    {
        const cover_img_url: string = await getCoverImgURL(formData.title);

        await db.query(
            "UPDATE books SET title = $1, rating = $2, date = $3, notes = $4, cover_img_src=$5 WHERE id = $6",
            [formData.title, formData.rating, formData.date, formData.notes, cover_img_url, formData.id]
        );

        res.redirect("/");
    }
    catch (error)
    {
        console.log(error);
    }
}

/**
 * Deletes a book entry from the database
 * @param req The request object
 * @param res The response object
 */
async function deleteBookEntry(req: Request, res: Response): Promise<void>
{
    const bookEntryID: number = parseInt(req.body.id);

    try
    {
        await db.query("DELETE FROM books WHERE id = $1", [bookEntryID]);

        res.redirect("/");
    }
    catch (error)
    {
        console.log(error);
    }
}

/**
 * Logs a message indicating that the server is listening
 */
function logServerStart(): void
{
    console.log(`Listening on http://localhost:${port}`);
}

// The root GET route
app.get("/", getHomePage);

// The sort GET routes
app.get("/sort/title", sortByTitle);
app.get("/sort/date", sortByDate);
app.get("/sort/rating", sortByRating);

// The add GET route
app.get("/add", getAddBookPage);

// The addBook POST route
app.post("/addBook", addBookEntry);

// The delete POST route
app.post("/delete", deleteBookEntry);

// The edit POST route
app.post("/edit", getEditBookPage);

// The editBook POST route
app.post("/editBook", editBookEntry);

// Starts the server
app.listen(port, logServerStart);
