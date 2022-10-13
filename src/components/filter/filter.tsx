import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchTickets,
  handleFilter,
  sortFilter,
} from "../../store/tickets-slice";
import "./filter.modules.scss";

function Filter() {
  const dispatch = useAppDispatch();
  const checked = useAppSelector(
    (state) => state.transbordingFilter.transbordingFilters,
  );

  const optionNames = useAppSelector(
    (state) => state.transbordingFilter.optionNames,
  );

  const transbordingFilters = optionNames.map((option, i) => {
    const toggleFilter = () => {
      dispatch(handleFilter({ option, checked, i }));
      dispatch(fetchTickets());
    };

    return (
      <label
        key={option}
        htmlFor={option}
        className="transbording-filters_option"
      >
        <input
          type="checkbox"
          id={option}
          name={option}
          value={option}
          checked={checked[i]}
          // onChange={() => dispatch(handleFilter({ option, checked, i }))}
          onChange={toggleFilter}
          className="transbording-filters_option-input"
        />
        <span className="transbording-filters_option-checkbox" />
        <span className="transbording-filters_option-description">
          {option}
        </span>
      </label>
    );
  });

  return (
    <div className="filter">
      <form className="transbording-filters">
        <h2 className="transbording-filters_title">КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
        {transbordingFilters}
      </form>

      <div className="sort-btn">
        <button
          type="button"
          className="btn"
          onClick={() => dispatch(sortFilter("Самый быстрый"))}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => dispatch(sortFilter("Самый дешевый"))}
        >
          САМЫЙ ДЕШЕВЫЙ
        </button>
      </div>
    </div>
  );
}

export default Filter;
