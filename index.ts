import express, {type Express, type Request, type Response} from "express";

const app: Express = express();
const port: number = 3000;

function getHomePage(_req: Request, res: Response): void
{
    res.render("index.ejs");
}

function logServerStart(): void
{
    console.log(`Listening on http://localhost:${port}`);
}

app.get("/", getHomePage);

app.listen(port, logServerStart);