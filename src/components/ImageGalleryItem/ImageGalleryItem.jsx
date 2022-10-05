// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Img } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setshowModal] = useState(false);

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  return (
    <>
      <Item onClick={toggleModal}>
        <Img src={webformatURL} alt={tags} loading="lazy" />
      </Item>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

// export class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { webformatURL, largeImageURL, tags } = this.props;
//     const { showModal } = this.state;
//     const { toggleModal } = this;
//     return (
//       <>
//         <Item onClick={toggleModal}>
//           <Img src={webformatURL} alt={tags} loading="lazy" />
//         </Item>
//         {showModal && (
//           <Modal onClose={toggleModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   webformatURL: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
// };