import "antd/dist/antd.css";
import { Alert } from "antd";
import { useEffect } from "react";
import { Offline, Online } from "react-detect-offline";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TicketsList from "../tickets-list/tickets-list";
import Filter from "../filter/filter";
import Loader from "../spinner/loader";
import AppCss from "./app.module.scss";
import { fetchTickets } from "../../store/tickets-slice";

function App() {
  const error = useAppSelector((state) => state.transbordingFilter);
  const dispatch = useAppDispatch();
  const stop = useAppSelector((state) => state.transbordingFilter.stop);

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  return (
    <div className={AppCss["app-wrapper"]}>
      {!stop && !error ? (
        <div className={AppCss["app-wrapper-loader"]}>
          <span>Загружаем билеты...</span>
          <Loader />
        </div>
      ) : null}

      <div className={AppCss.logo} />
      <Filter />
      <Offline>
        <Alert message="Please check your Internet Connection" type="error" />
      </Offline>
      <Online>
        <TicketsList />
      </Online>
    </div>
  );
}

export default App;
