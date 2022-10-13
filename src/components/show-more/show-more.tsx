import PropTypes from "prop-types";
import showMoreCss from "./show-more.module.scss";

function ShowMore({ sliceResults }: any) {
  return (
    <button
      type="button"
      className={showMoreCss["show-more"]}
      onClick={sliceResults}
    >
      <span className={showMoreCss["show-more-text"]}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
      </span>
    </button>
  );
}

export default ShowMore;

ShowMore.propTypes = {
  sliceResults: PropTypes.func.isRequired,
};
