import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import PropTypes from 'prop-types';
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled'

export const Searchbar = ({ onSubmit }) => {

    return (
        <SearchbarHeader>
        <Formik
                initialValues={{
                    value: '',
                }}
                onSubmit={(value, actions) => {
                    if (!value.value.trim()) {
                        return toast.error('Please, enter request');
                    }
                    
                    onSubmit(value.value);
                    actions.resetForm();
                }}

        >
            <SearchForm>
                <SearchFormButton type="submit">                     
                            <FaSearch/>
                </SearchFormButton>
                <SearchFormInput className="input"
                    name="value"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos">
                </SearchFormInput>
            </SearchForm>
            </Formik>
        </SearchbarHeader>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
