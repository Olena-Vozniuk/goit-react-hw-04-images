import PropTypes from 'prop-types';
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryList } from './ImageGallery.styled';



export const ImageGallery = ({ images }) => {
        return (
            <> 
                {images[0] &&
                    <ImageGalleryList className="gallery">
                        {images.map(({ id, ...otherProps }) => (
                            <ImageGalleryItem key={id} {...otherProps} />
                            ))}
                    </ImageGalleryList> 
                    }
        
            </>
        )
    
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,  
})).isRequired,
};