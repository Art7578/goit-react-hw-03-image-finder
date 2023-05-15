import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css'


export default class Modal extends Component {
    static propTypes = {
        onModalClick: PropTypes.func.isRequired,
        largeImg: PropTypes.string.isRequired,
        altTag: PropTypes.string.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if(event.code === 'Escape') {
            this.props.onModalClick();
        }
    };

    render() {
        const {onModalClick, largeImg, altTag} = this.props;
        return (
            <div className={css.overlay} onClick={() => onModalClick()}>
                <div className={css.modal}>
                    <img src={largeImg} alt={altTag} className={css.image}/>
                </div>
            </div>
        );
    }

}