CREATE TABLE books
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    rating SMALLINT NOT NULL,
    date DATE,
    notes TEXT,
    cover_img_src TEXT
);

INSERT INTO books (title, rating, date, notes, cover_img_src)
VALUES (
    'Persona 3 Volume 1',
    10,
    '2026-05-30',
    'The first manga of the series had a really good start.',
    'https://covers.openlibrary.org/b/olid/OL53229276M-M.jpg'
);


INSERT INTO books (title, rating, date, notes, cover_img_src)
VALUES (
    'Persona 3 Volume 2',
    8,
    '2026-06-02',
    'The second chapter did not exactly have as much action scenes, but it did have a decent story.',
    'https://covers.openlibrary.org/b/olid/OL28872630M-M.jpg'
);


INSERT INTO books (title, rating, date, notes, cover_img_src)
VALUES (
    'Persona 3 Volume 3',
    9,
    '2026-06-09',
    'The story that they made for the highlight character of this chapter was very well-written.',
    'https://covers.openlibrary.org/b/olid/OL47107219M-M.jpg'
);


INSERT INTO books (title, rating, date, notes, cover_img_src)
VALUES (
    'Persona 3 Volume 4',
    7,
    '2026-07-12',
    'This chapter had its moments during certain parts, but it was not as good as previous chapters.',
    'https://covers.openlibrary.org/b/olid/OL47107222M-M.jpg'
);


INSERT INTO books (title, rating, date, notes, cover_img_src)
VALUES (
    'Persona 3 Volume 5',
    8,
    '2026-09-28',
    'The story used for this chapter was relatively descent, considering the plotline for this chapter.',
    'https://covers.openlibrary.org/b/olid/OL47122158M-M.jpg'
);


INSERT INTO books (title, rating, date, notes, cover_img_src)
VALUES (
    'Persona 3 Volume 6',
    9,
    '2026-10-16',
    'The story for this chapter showed the background for the highlight character really well.',
    'https://covers.openlibrary.org/b/olid/OL47107226M-M.jpg'

   );