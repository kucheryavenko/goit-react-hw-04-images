import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Searchbar,
  ImageGallery,
  Button,
  Loader,
  Notification,
  Modal,
} from 'components';
import { fetchData } from 'services/api';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [largeImage, setlargeImage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    const getImage = async (searchQuery, page) => {
      if (!searchQuery) {
        return;
      }
      try {
        setStatus('pending');

        const { hits, totalHits } = await fetchData(searchQuery, page);

        if (hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setStatus('rejected');
          return;
        }
        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        setStatus('resolved');
        setHits(prevHits => [...prevHits, ...hits]);
      } catch (error) {
        console.error(error);
        setStatus('rejected');
      }
    };

    getImage(searchQuery, page);
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setHits([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = largeImage => {
    setshowModal(!showModal);
    setlargeImage(largeImage);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'rejected' && (
        <Notification>
          Ooops, someting went wrong. Please, try again.
        </Notification>
      )}
      {hits.length > 0 && status !== 'rejected' && (
        <ImageGallery toggleModal={toggleModal} hits={hits} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && hits.length > 0 && hits.length % 12 === 0 && (
        <Button onClick={onLoadMore}>LoadMore</Button>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="LargeImage" />
        </Modal>
      )}
      <ToastContainer autoClose={5000} />
    </Container>
  );
};
