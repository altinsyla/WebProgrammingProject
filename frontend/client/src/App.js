import UserList from './UserList';
import './App.css';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <h1>User Management</h1>
      <UserList />
      <h1>Task Management</h1>
      <TaskList />
    </div>
  );
}

export default App;
