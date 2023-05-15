import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
    };

    state = {
        searchQuery: '',
    };

    handleQueryChange = event => {
        const searchValue = event.currentTarget.value.toLowerCase();
        this.setState({searchQuery: searchValue});
    };

    handleSubmit = event => {
        const {onSubmit} = this.props;
        const {searchQuery} = this.state;

        event.preventDefault();

        if (searchQuery.trim() === '') {
            toast.warn('Please, enter a search term');
        }
        onSubmit(searchQuery);
        this.setState({
            searchQuery: event.target.elements.searchQuery.value,
        });
    };

    render() {
        const {searchQuery} = this.state;
        return (
            <header className={css.searchbar}>
                <form onSubmit={this.handleSubmit} className={css.form}>
                    <button type="submit" className={css.button}>
                        <span className={css.label}>Search</span>
                    </button>

                    <input 
                    className={css.input}
                    type="text"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={this.handleQueryChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
}
