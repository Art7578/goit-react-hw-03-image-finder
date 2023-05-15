import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGalleryItem = ({url, tag, openModal, largeImageURL}) => {
    return (
        <li className={css.item}>
            <img 
            onClick={() => openModal(tag, largeImageURL)}
            src={url}
            alt={tag || 'image'}
            loading="lazy"
            className={css.image}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    openModal: PropTypes.func,
    largeImageURL: PropTypes.string.isRequired,
};
export default ImageGalleryItem;