import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ toggleModal, hits }) => {
  return (
    <List>
      {hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onOpen={toggleModal}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
