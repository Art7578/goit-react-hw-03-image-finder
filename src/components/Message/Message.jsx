import PropTypes from 'prop-types';
import css from './Message.module.css';

const Message = ({ children }) => (
  <div className={css.message}>{children}</div>
);

Message.defaultProps = {
  children: [],
};

Message.propTypes = {
  children: PropTypes.node,
};

export default Message;