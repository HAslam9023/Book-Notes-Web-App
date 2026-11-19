CREATE TABLE books
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    rating SMALLINT NOT NULL,
    date DATE,
    notes TEXT
);

INSERT INTO books (title, rating, date, notes)
VALUES ('Persona 3 Volume 1', 10, '2026-05-30', 'The first manga of the series had a really good start.');


INSERT INTO books (title, rating, date, notes)
VALUES ('Persona 3 Volume 2', 8, '2026-06-02', 'The second chapter did not exactly have as much action scenes, but it did have a decent story.');


INSERT INTO books (title, rating, date, notes)
VALUES ('Persona 3 Volume 3', 9, '2026-06-09', 'The story that they made for the highlight character of this chapter was very well-written.');


INSERT INTO books (title, rating, date, notes)
VALUES ('Persona 3 Volume 4', 7, '2026-07-12', 'This chapter had its moments during certain parts, but it was not as good as previous chapters.');


INSERT INTO books (title, rating, date, notes)
VALUES ('Persona 3 Volume 5', 8, '2026-09-28', 'The story used for this chapter was relatively descent, considering the plotline for this chapter.');


INSERT INTO books (title, rating, date, notes)
VALUES ('Persona 3 Volume 6', 9, '2026-10-16', 'The story for this chapter showed the background for the highlight character really well.');