import { GlobalStyle } from 'GlobalStyle';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AppStyled } from './App.styled';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from "components/Loader/Loader";
import { getImages } from "components/Services/api";
import { Button } from "components/Button/Button";


export const App = () => {

  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoadButton, setShowLoadButton] = useState(false);

  useEffect(() => {
    if (value === '') {
      return
    };
    setLoading(true);
    getImages(value.value, page)
      .then(response => response.json())
      .then(images => {
        if (images.totalHits === 0) {
          return toast.error(`Invalid request "${value.value}"`);
        }else if (images.totalHits !== 0 && page === 1) {
          setImages(images.hits);
          toast.success(`There are ${images.totalHits} for your request`);
        } else {
          setImages(prevstate => [...prevstate, ...images.hits]);
        }
        ; 
       images.totalHits === images.total ? setShowLoadButton(false) : setShowLoadButton(true)   
      }
      ).catch(error => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [value, page]);

  const submitForm = (value) => {
    setValue({ value });
    setPage(1);
    setImages([]);
  };

  const handleLoad = () => {
    setPage(page => page + 1)
  };

    return (
      <AppStyled>
        <Toaster position='top-right' toastOptions={{duration: 2000,}} />
        <Searchbar  onSubmit={submitForm}  />
        <ImageGallery images={images} />
        {error && <p align="center">Sorry, no results for "{value}"</p>}
        {loading && <Loader />}
        {!error && showLoadButton && <Button onClick={handleLoad} />}
      <GlobalStyle />
    </AppStyled>
  );
}
