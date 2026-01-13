import { useState, useEffect } from 'react';
import { apiFetch } from './apiFetch';
import './App.css';

interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  user: number;
  create_at?: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogDescription, setNewBlogDescription] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(1);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  /* =======================
      FETCH BLOGS
  ======================= */
  const fetchBlogs = async () => {
    const data = await apiFetch({ path: '/blogs/' });
    if (data) setBlogs(data);
  };

  /* =======================
      FETCH USERS
  ======================= */
  const fetchUsers = async () => {
    const data = await apiFetch({ path: '/users/' });
    if (data) setUsers(data);
  };

  /* =======================
      USE EFFECT
  ======================= */
  useEffect(() => {
    fetchBlogs();
    fetchUsers();
  }, []);

  /* =======================
      CREATE BLOG
  ======================= */
  const createBlog = async () => {
    await apiFetch({
      path: '/blogs/',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newBlogTitle,
        description: newBlogDescription,
        category: newBlogCategory,
        user: selectedUserId,
      }),
    });
    setNewBlogTitle('');
    setNewBlogDescription('');
    setNewBlogCategory('');
    fetchBlogs();
  };

  /* =======================
      DELETE BLOG
  ======================= */
  const deleteBlog = async (id: number) => {
    await apiFetch({ path: `/blogs/${id}/`, method: 'DELETE' });
    fetchBlogs();
  };

  /* =======================
      CREATE USER
  ======================= */
  const createUser = async () => {
    await apiFetch({
      path: '/users/register/',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    setNewUser({ username: '', email: '', password: '' });
    fetchUsers();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blogs</h1>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <p><strong>Catégorie:</strong> {blog.category}</p>
            <p><strong>User ID:</strong> {blog.user}</p>
            <button onClick={() => deleteBlog(blog.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <h2>Créer un article</h2>
      <input
        type="text"
        placeholder="Titre"
        value={newBlogTitle}
        onChange={(e) => setNewBlogTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={newBlogDescription}
        onChange={(e) => setNewBlogDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Catégorie"
        value={newBlogCategory}
        onChange={(e) => setNewBlogCategory(e.target.value)}
      />

      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(Number(e.target.value))}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      <button onClick={createBlog}>Créer l’article</button>

      <hr />

      <h2>Créer un utilisateur</h2>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={createUser}>Créer l’utilisateur</button>
    </div>
  );
}

export default App;
