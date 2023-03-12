import PropTypes from 'prop-types';
import { useState } from "react";
import { Modal } from "components/Modal/Modal";
import { ImageGalleryListItem, ImageGalleryItemImage } from "./ImageGalleryItem.styled";


export const ImageGalleryItem = ({webformatURL, tags, largeImageURL}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

    return (<ImageGalleryListItem>
        <ImageGalleryItemImage
          onClick={toggleModal}
          src={webformatURL}
          alt={tags}
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ImageGalleryListItem>)
    };
  

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};