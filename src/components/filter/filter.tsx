import { useAppDispatch, useAppSelector } from "../../hooks";
import { handleFilter, sortFilter } from "../../store/tickets-slice";
import filterCss from "./filter.module.scss";

function Filter() {
  const dispatch = useAppDispatch();
  const checked = useAppSelector(
    (state) => state.transbordingFilter.transbordingFilters,
  );

  const optionNames = useAppSelector(
    (state) => state.transbordingFilter.optionNames,
  );

  const transbordingFilters = optionNames.map((option, i) => {
    return (
      <label
        key={option}
        htmlFor={option}
        className={filterCss["transbording-filters_option"]}
      >
        <input
          type="checkbox"
          id={option}
          name={option}
          value={option}
          checked={checked[i]}
          onChange={() => dispatch(handleFilter({ option, checked, i }))}
          className={filterCss["transbording-filters_option-input"]}
        />
        <span className={filterCss["transbording-filters_option-checkbox"]} />
        <span className={filterCss["transbording-filters_option-description"]}>
          {option}
        </span>
      </label>
    );
  });

  return (
    <div className={filterCss.filter}>
      <form className={filterCss["transbording-filters"]}>
        <h2 className={filterCss["transbording-filters_title"]}>
          КОЛИЧЕСТВО ПЕРЕСАДОК
        </h2>
        {transbordingFilters}
      </form>

      <div className={filterCss["sort-btn"]}>
        <button
          type="button"
          className={filterCss.btn}
          onClick={() => dispatch(sortFilter("Самый быстрый"))}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
        <button
          type="button"
          className={filterCss.btn}
          onClick={() => dispatch(sortFilter("Самый дешевый"))}
        >
          САМЫЙ ДЕШЕВЫЙ
        </button>
      </div>
    </div>
  );
}

export default Filter;
