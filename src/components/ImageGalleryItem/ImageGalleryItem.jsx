import PropTypes from 'prop-types';
import { Item, Img } from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  onOpen,
  webformatURL,
  largeImageURL,
  tags,
}) => {
  return (
    <Item onClick={() => onOpen(largeImageURL)}>
      <Img src={webformatURL} alt={tags} loading="lazy" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  onOpen: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
