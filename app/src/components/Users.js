function Users() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios.get('/api/users')
        .then(response => setUsers(response.data))
        .catch(error => console.log(error));
    }, []);
  
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Users;
  