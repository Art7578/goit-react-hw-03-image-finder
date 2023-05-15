import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from 'images-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Message from 'components/Message/Message';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import mapper from './utils/mapper';
import Error from './Error/Error';
import Loader from './Loader/Loader';


export default class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    showModal: false,
    loading: false,
    largeImage: '',
    tag: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });
      this.fetchGallery();
    }
  }

  fetchGallery = () => {
    const { searchQuery, page } = this.state;

    fetchImages(searchQuery, page)
      .then(res => {
        const nextImages = mapper(res.data.hits);

        if (!res.data.hits.length) {
          this.setState({ images: [] });

          toast.error('Sorry, image not found.');
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...nextImages],
        }));
      })
      .catch(error => {
        this.setState({ error });
        toast.error('Something went wrong');
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ page: 1, images: [], searchQuery });
  };

  onLoadBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (tag, largeImageURL) => {
    this.toggleModal();
    this.setState({
      largeImage: largeImageURL,
      tag: tag,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, showModal, loading, error, largeImage, tag } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images.length < 1 && (
        <Message>
          <h2>The gallery is empty</h2>
          <p>Use search field!</p>
        </Message>
      )}

        {error && <Error message={error.message} />}
        {images.length && (
          <ImageGallery images={images} onOpenModal={this.openModal} />
        )}
        {/* <ImageGallery images={images} onOpenModal={this.openModal} /> */}
        {loading && <Loader />}
        {images.length > 11 && <Button onBtnClick={this.onLoadBtnClick} />}
        {showModal && (
          <Modal
            largeImg={largeImage}
            altTag={tag}
            onModalClick={this.toggleModal}
          />
        )}
        <ToastContainer
          position="top-right"
          theme="colored"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
