require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { SERVER_PORT } = process.env;
const { register, login } = require('./controllers/auth');
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require('./controllers/posts');
const { isAuthenticated } = require('./middleware/isAuthenticated');
const { sequelize } = require('./util/database');
const { User } = require('./models/user');
const { Post } = require('./models/post');

User.hasMany(Post);
Post.belongsTo(User);

const app = express();

app.use(express.json());
app.use(cors());

app.get('/posts', getAllPosts);

app.post('/register', register);
app.post('/login', login);

app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);

// { force: true }

sequelize
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`running on PORT ${SERVER_PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
