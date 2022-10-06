import "./filter.modules.scss";

function Filter() {
  return (
    <div className="filter">
      <form className="transbording-filters">
        <h2 className="transbording-filters_title">КОЛИЧЕСТВО ПЕРЕСАДОК</h2>

        <label htmlFor="all-tickets" className="transbording-filters_option">
          <input
            type="checkbox"
            id="all-tickets"
            className="transbording-filters_option-input"
          />
          <span className="transbording-filters_option-checkbox" />
          <span className="transbording-filters_option-description">Все</span>
        </label>

        <label
          htmlFor="no-transbording"
          className="transbording-filters_option"
        >
          <input
            type="checkbox"
            id="no-transbording"
            className="transbording-filters_option-input"
          />
          <span className="transbording-filters_option-checkbox" />
          <span className="transbording-filters_option-description">
            Без пересадок
          </span>
        </label>

        <label
          htmlFor="one-transbording"
          className="transbording-filters_option"
        >
          <input
            type="checkbox"
            id="one-transbording"
            className="transbording-filters_option-input"
          />
          <span className="transbording-filters_option-checkbox" />
          <span className="transbording-filters_option-description">
            1 пересадка
          </span>
        </label>

        <label
          htmlFor="two-transbording"
          className="transbording-filters_option"
        >
          <input
            type="checkbox"
            id="two-transbording"
            className="transbording-filters_option-input"
          />
          <span className="transbording-filters_option-checkbox" />
          <span className="transbording-filters_option-description">
            2 пересадки
          </span>
        </label>

        <label
          htmlFor="three-transbording"
          className="transbording-filters_option"
        >
          <input
            type="checkbox"
            id="three-transbording"
            className="transbording-filters_option-input"
          />
          <span className="transbording-filters_option-checkbox" />
          <span className="transbording-filters_option-description">
            3 пересадки
          </span>
        </label>
      </form>

      <div className="sort-btn">
        <button type="button" className="btn">
          {/* <span className="btn_description"></span> */}
          САМЫЙ БЫСТРЫЙ
        </button>
        <button type="button" className="btn">
          {/* <span className="btn_description"></span> */}
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button type="button" className="btn">
          {/* <span className="btn_description"></span> */}
          ОПТИМАЛЬНЫЙ
        </button>
      </div>
    </div>
  );
}

export default Filter;
