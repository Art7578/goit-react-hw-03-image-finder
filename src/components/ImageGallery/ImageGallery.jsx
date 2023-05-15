import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({images, onOpenModal}) => {
    return (
        <ul className={css.gallery}>
            {images.map(({id, webformatURL, tags, largeImageURL}) => {
                return (
                    <ImageGalleryItem 
                    key={id}
                    url={webformatURL}
                    tag={tags}
                    largeImageURL={largeImageURL}
                    id={id}
                    openModal={onOpenModal}
                    />
                );
            })}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
    openModal: PropTypes.func,
  };
  
  export default ImageGallery;