import styles from './App.module.css';
import HeaderComponent from './components/Header/HeaderComponent';
import TodoCreate from './components/TodoCreate/TodoCreate';
import TodoList from './components/TodoList/TodoList';
import { useAppSelector } from './hooks/redux';

function App() {
  const { theme } = useAppSelector((state) => state.todoSlice);
  
  return (
    <div className={`${styles.main} ${theme === 'light' ? styles.light : styles.dark}`}>
      <div className={styles.container}>
        <HeaderComponent />
        <TodoCreate />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
