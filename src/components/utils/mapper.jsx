export default function mapper(array) {
    return array.map(({id, webformatURL, largeImageURL, tags}) => ({
        webformatURL,
        largeImageURL,
        id,
        tags,
    }));
}