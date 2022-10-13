import "antd/dist/antd.css";
import { Alert } from "antd";
import { useEffect } from "react";
import { Offline, Online } from "react-detect-offline";
import { useAppDispatch, useAppSelector } from "../../hooks";
// import { useAppSelector } from "../../hooks";
// import generateSearchId from "../../logic/fetch-data";
// import { fetchTickets } from "../../store/tickets-slice";
import TicketsList from "../tickets-list/tickets-list";
import Filter from "../filter/filter";
import Loader from "../spinner/loader";
import "./app.modules.scss";
import { fetchTickets } from "../../store/tickets-slice";

function App() {
  const error = useAppSelector((state) => state.transbordingFilter);
  const dispatch = useAppDispatch();
  // const userId = useAppSelector((state) => state.transbordingFilter.userId);
  // const [userId, setUserId] = useState("");
  const stop = useAppSelector((state) => state.transbordingFilter.stop);

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  return (
    <div className="app_wrapper">
      {!stop && !error ? (
        <div className="app_wrapper-loader">
          <span>Загружаем билеты...</span>
          <Loader />
        </div>
      ) : null}

      <div className="logo" />
      <Filter />
      <Offline>
        <Alert message="Please check your Internet Connection" type="error" />
      </Offline>
      <Online>
        {/* {error ? (
          <div
            style={{
              background: "transparent",
              margin: "20px",
            }}
          >
            <Alert
              message="Something went wrong. Please give another try"
              type="error"
            />
          </div>
        ) : null} */}
        <TicketsList />
      </Online>
    </div>
  );
}

export default App;
