import { useAppDispatch, useAppSelector } from "../../hooks";
import { handleFilter } from "../../store/transbording-slice";
import { sortFilter } from "../../store/sort-slice";
import "./filter.modules.scss";

function Filter() {
  const checked = useAppSelector(
    (state) => state.transbordingFilter.transbordingFilters,
  );

  const optionNames = useAppSelector(
    (state) => state.transbordingFilter.optionNames,
  );

  const dispatch = useAppDispatch();

  const transbordingFilters = optionNames.map((option, i) => {
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
          onChange={() => dispatch(handleFilter({ option, checked, i }))}
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

// function Filter() {
//   const optionNames = [
//     "Показать все",
//     "Без пересадок",
//     "1 пересадка",
//     "2 пересадки",
//     "3 пересадки",
//   ];

//   // состояние чекбоксов для к-ва пересадок:
//   const [checkedState, setCheckedState] = useState(
//     new Array(optionNames.length).fill(false),
//   );

//   const numberOfChecked = checkedState.reduce((prev, cur) => {
//     return +prev + cur;
//   }, 0);

//   const handleFilter = (
//     filterName: string,
//     isChecked: boolean,
//     position: number,
//   ) => {
//     if (filterName === "Показать все" && !isChecked) {
//       setCheckedState(new Array(optionNames.length).fill(true));
//     } else if (filterName === "Показать все" && isChecked) {
//       setCheckedState(new Array(optionNames.length).fill(false));
//     } else if (
//       numberOfChecked === 3 &&
//       filterName !== "Показать все" &&
//       !isChecked
//     ) {
//       setCheckedState(new Array(optionNames.length).fill(true));
//     } else if (
//       numberOfChecked === 5 &&
//       filterName !== "Показать все" &&
//       isChecked
//     ) {
//       const indexOffFilterAll = optionNames.indexOf("Показать все");
//       const updatedCheckedState = checkedState.map((item, index) =>
//         index === position ? !item : item,
//       );
//       const takeOffAllFilter = updatedCheckedState.map((item, index) =>
//         index === indexOffFilterAll ? !item : item,
//       );
//       setCheckedState(takeOffAllFilter);
//     } else {
//       const updatedCheckedState = checkedState.map((item, index) =>
//         index === position ? !item : item,
//       );
//       setCheckedState(updatedCheckedState);
//     }
//   };

//   const transbordingFilters = optionNames.map((option, i) => {
//     return (
//       <label
//         key={option}
//         htmlFor={option}
//         className="transbording-filters_option"
//       >
//         <input
//           type="checkbox"
//           id={option}
//           name={option}
//           value={option}
//           checked={checkedState[i]}
//           onChange={() => handleFilter(option, checkedState[i], i)}
//           className="transbording-filters_option-input"
//         />
//         <span className="transbording-filters_option-checkbox" />
//         <span className="transbording-filters_option-description">
//           {option}
//         </span>
//       </label>
//     );
//   });

//   return (
//     <div className="filter">
//       <form className="transbording-filters">
//         <h2 className="transbording-filters_title">КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
//         {transbordingFilters}
//       </form>

//       <div className="sort-btn">
//         <button type="button" className="btn">
//           САМЫЙ БЫСТРЫЙ
//         </button>
//         <button type="button" className="btn">
//           САМЫЙ ДЕШЕВЫЙ
//         </button>
//         <button type="button" className="btn">
//           ОПТИМАЛЬНЫЙ
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Filter;
