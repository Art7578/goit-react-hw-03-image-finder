import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({onBtnClick}) => {
    return (
        <button type="button" onClick={onBtnClick} className={css.button}>
            Load more
        </button>
    );
};

Button.propTypes = {
    onBtnClick: PropTypes.func.isRequired,
};
export default Button;