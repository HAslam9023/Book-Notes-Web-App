/**
 * Defines the structure of a book entry
 */
export interface BookEntry
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