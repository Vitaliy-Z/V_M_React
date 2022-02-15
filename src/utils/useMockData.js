import { useEffect, useState } from "react";
import professions from "../api/mockData/professions.json";
import qualities from "../api/mockData/qualities.json";
import users from "../api/mockData/users.json";
import {
  professionEndpoint,
  userEndpoint,
  qualityEndpoint
} from "../services/config.json";
import httpService from "../services/httpService";

const STATUS = {
  idle: "Загрузка не началась",
  pending: "В процесе загрузки",
  succses: "Загрузка завершена",
  error: "Ошибка при загрузке"
};

const useMockData = () => {
  const [status, setStatus] = useState(STATUS.idle);
  const [error, setError] = useState();
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summuryCounts = professions.length + qualities.length + users.length;

  const updateProgress = () => {
    const newProgress = Math.floor((count / summuryCounts) * 100);
    if (count !== 0 && status === STATUS.idle) {
      setStatus(STATUS.pending);
    }
    if (progress < newProgress) {
      setProgress(newProgress);
    }
    if (newProgress === 100) {
      setStatus(STATUS.succses);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  const initialize = async () => {
    setStatus(STATUS.pending);
    try {
      for (const prof of professions) {
        await httpService.put(professionEndpoint + prof._id, prof);
        setCount(prev => prev + 1);
      }
      for (const user of users) {
        await httpService.put(userEndpoint + user._id, user);
        setCount(prev => prev + 1);
      }
      for (const qual of qualities) {
        await httpService.put(qualityEndpoint + qual._id, qual);
        setCount(prev => prev + 1);
      }
    } catch (err) {
      setStatus(STATUS.error);
      setError(err);
    }
  };

  return { status, error, progress, initialize };
};

export default useMockData;
