import axios from "axios";

const KEY = '34878061-651ace69cd69c02d4b4ecf72c';
const baseURL = 'https://pixabay.com/api/';

export default async function fetchImages(searchQuery, page = 1) {
    return await axios.get (
        `${baseURL}?key=${KEY}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
}