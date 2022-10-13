import PropTypes from "prop-types";
import "./show-more.modules.scss";

function ShowMore({ sliceResults }: any) {
  return (
    <button type="button" className="show-more" onClick={sliceResults}>
      <span className="show-more_text">ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ</span>
    </button>
  );
}

export default ShowMore;

ShowMore.propTypes = {
  sliceResults: PropTypes.func.isRequired,
};
