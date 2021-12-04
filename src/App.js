import { useEffect, useState } from 'react';
import * as axios from 'axios';
import './App.css';

const API_HOST = 'https://jsonplaceholder.typicode.com';

function App() {
  const [data, setData] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getFakeData = () => {
    axios.get(`${API_HOST}/todos/1`)
      .then((response) => {
        setTimeout(() => {
          setData(JSON.stringify(response.data, null, 2));
        }, 5000);
      }).catch(err => {
        alert(err);
      });
  };

  const getOneTodo = (todoId) => new Promise((resolve, reject) => {
    axios.get(`${API_HOST}/todos/${todoId}`)
      .then((response) => {
        resolve(response.data);
      }).catch(err => {
        reject(err);
      });
  });

  const getFakePackageData = () => {
    const todosActions = [];
    for (let i = 1; i < 10; i++) {
      todosActions.push(getOneTodo(i));
    }
    Promise.all(todosActions).then((result) => {
      setData(JSON.stringify(result, null, 2));
    });
  };

  return (
    <div>
      <div><button onClick={getFakeData}>get data</button> <button onClick={getFakePackageData}>get big data</button> <span>{currentTime}</span></div>
      <div>{data}</div>
    </div>
  );
}

export default App;
