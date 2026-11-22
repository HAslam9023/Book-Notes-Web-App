import dotenv from "dotenv";
import express, {type Express, type Request, type Response} from "express";
import pg, {type Pool, type PoolConfig, type QueryResult} from "pg";

const app: Express = express();
const port: number = 3000;

dotenv.config();

const db_config: PoolConfig = {
    user: process.env.LOCAL_DB_USER || "postgres",
    host: process.env.LOCAL_DB_HOST || "localhost",
    database: process.env.LOCAL_DB_DATABASE || "book_notes",
    password: process.env.LOCAL_DB_PASSWORD,
    port: process.env.LOCAL_DB_PORT ? parseInt(process.env.LOCAL_DB_PORT) : 5432,
};

const db: Pool = new pg.Pool(db_config);

interface BookEntry
{
    id: number;
    title: string;
    rating: number;
    date: Date;
    notes: string;
}

let books: BookEntry[] = [];

app.use(express.static("public"));

async function getHomePage(_req: Request, res: Response): Promise<void>
{
    const result: QueryResult<BookEntry> = await db.query("SELECT * FROM books ORDER BY id");

    books = result.rows;

    res.render("index.ejs", {books: books});
}

function logServerStart(): void
{
    console.log(`Listening on http://localhost:${port}`);
}

app.get("/", getHomePage);

app.listen(port, logServerStart);