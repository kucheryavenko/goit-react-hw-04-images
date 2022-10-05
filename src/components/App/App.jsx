// import { Component } from 'react';
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
} from 'components';
import { fetchData } from 'services/api';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');

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

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'rejected' && (
        <Notification>
          Ooops, someting went wrong. Please, try again.
        </Notification>
      )}
      {hits.length > 0 && status !== 'rejected' && <ImageGallery hits={hits} />}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && hits.length > 0 && hits.length % 12 === 0 && (
        <Button onClick={onLoadMore}>LoadMore</Button>
      )}
      <ToastContainer autoClose={5000} />
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     hits: [],
//     searchQuery: '',
//     page: 1,
//     status: 'idle',
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       prevState.searchQuery !== this.state.searchQuery ||
//       prevState.page !== this.state.page
//     ) {
//       this.getImage(this.state.searchQuery, this.state.page);
//     }
//   }

//   getImage = async (searchQuery, page) => {
//     if (!searchQuery) {
//       return;
//     }
//     try {
//       this.setState({ status: 'pending' });

//       const { hits, totalHits } = await fetchData(searchQuery, page);

//       if (hits.length === 0) {
//         toast.error(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         this.setState({ status: 'rejected' });
//         return;
//       }
//       if (page === 1) {
//         toast.success(`Hooray! We found ${totalHits} images.`);
//       }
//       this.setState({ status: 'resolved' });
//       this.setState(prevState => {
//         return {
//           hits: [...prevState.hits, ...hits],
//         };
//       });
//     } catch (error) {
//       console.error(error);
//       this.setState({ status: 'rejected' });
//     }
//   };

//   handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery, page: 1, hits: [] });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };

//   render() {
//     const { hits, status } = this.state;
//     const { handleFormSubmit, onLoadMore } = this;

//     return (
//       <Container>
//         <Searchbar onSubmit={handleFormSubmit} />
//         {status === 'rejected' && (
//           <Notification>
//             Ooops, someting went wrong. Please, try again.
//           </Notification>
//         )}
//         {hits.length > 0 && status !== 'rejected' && (
//           <ImageGallery hits={hits} />
//         )}
//         {status === 'pending' && <Loader />}
//         {status === 'resolved' && hits.length > 0 && hits.length % 12 === 0 && (
//           <Button onClick={onLoadMore}>LoadMore</Button>
//         )}
//         <ToastContainer autoClose={5000} />
//       </Container>
//     );
//   }
// }
