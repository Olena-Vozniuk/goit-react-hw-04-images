import { GlobalStyle } from 'GlobalStyle';
import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppStyled } from './App.styled';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from "components/Loader/Loader";
import { getImages } from "components/Services/api";
import { Button } from "components/Button/Button";


export class App extends Component{
  state = {
    value: '',
    page: 1,
    images: [],
    loading: false,
    error: '',
    showModal: false,
    showLoadButton: false,
  }
  
  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;

    if (value !== prevState.value || page !== prevState.page) {
          this.setState((prevState) => (
            {
              page: (value === prevState.value) ? (prevState.page) : 1,
              loading: true,
              showLoadButton: true,
            }))
      
            getImages(value, page)
                .then(response => response.json())
                .then(images => {
                    if (images.totalHits === 0 ) {
                      return Promise.reject(
                        new Error('something is wrong!'));
                    }
                  
                  this.setState({
                    images: page === 1 ? images.hits : [...this.state.images, ...images.hits],

                  })
                  
                }).catch(error => {
                    this.setState({ error, showLoadButton: false, images: [], })
                }).finally(() => {
                    this.setState({
                        loading: false,
                    })
                })
            this.setState({error: ''})
        }
        
}
  
  submitForm = (value) => {
    this.setState({ value, page:1 })
  }
  

  handleLoad = () => {
        this.setState((prev) => ({ page: prev.page + 1 }))
  }
  
  toggleModal = () =>
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))

  
  render() {
    const { error, loading, images, value } = this.state;
    
    return (
      <AppStyled>
        <Toaster position='top-right'
          toastOptions={{
            duration: 1000,}} />
        <Searchbar  onSubmit={this.submitForm}  />
        <ImageGallery images={images} />
        {error && <p align="center">Sorry, no results for "{value}"</p>}
        {loading && <Loader />}
        {!error && images[0] && <Button onClick={this.handleLoad} />}
      <GlobalStyle />
    </AppStyled>
  );}
};