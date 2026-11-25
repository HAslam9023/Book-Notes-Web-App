// Imports the necessary modules and types
import dotenv from "dotenv";
import express, {type Express, type Request, type Response} from "express";
import pg, {type Pool, type PoolConfig, type QueryResult} from "pg";

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
    user: process.env.LOCAL_DB_USER || "postgres",
    host: process.env.LOCAL_DB_HOST || "localhost",
    database: process.env.LOCAL_DB_DATABASE || "book_notes",
    password: process.env.LOCAL_DB_PASSWORD,
    port: process.env.LOCAL_DB_PORT ? parseInt(process.env.LOCAL_DB_PORT) : 5432,
};

/**
 * Initializes the database connection
 */
const db: Pool = new pg.Pool(db_config);

/**
 * Defines the structure of a book entry
 */
interface BookEntry
{
    /**
     * The unique identifier for the book entry
     */
    id: number;
    /**
     * The title of the book
     */
    title: string;
    /**
     * The rating of the book
     */
    rating: number;
    /**
     * The date the book was read
     */
    date: Date;
    /**
     * The notes associated with the book
     */
    notes: string;
    /**
     * The source URL for the book cover image
     */
    cover_img_src: string;
}

/**
 * Initializes the array to store book entries
 */
let books: BookEntry[] = [];

// Middleware
app.use(express.static("public"));

/**
 * Renders the home page and displays the book entries
 * @param _req The request object
 * @param res The response object
 */
async function getHomePage(_req: Request, res: Response): Promise<void>
{
    // Retrieves book entries from the database
    const result: QueryResult<BookEntry> = await db.query("SELECT * FROM books ORDER BY id");

    books = result.rows;

    res.render("index.ejs", {books: books});
}

function getAddBookPage(_req: Request, res: Response): void
{
    res.render("book.ejs");
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

// The add book GET route
app.get("/add", getAddBookPage);

// Starts the server
app.listen(port, logServerStart);