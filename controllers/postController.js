const connection = require("../data/db");

//# INDEX

const index = (req, res) => {
  const sql = `SELECT * FROM posts`;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({
      data: results,
      status: 200,
    });
  });
};

//# SHOW

const show = (req, res) => {
  const postId = parseInt(req.params.id);
  const sqlPost = `SELECT * FROM posts WHERE id = ?`;
  connection.query(sqlPost, [postId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Post not found" });

    const post = results[0];

    const sqlTag = `SELECT tags.*
FROM tags
INNER JOIN post_tag
ON tags . id = post_tag . tag_id
WHERE post_id = ?`;

    connection.query(sqlTag, [postId], (err, results) => {
      post.tags = results;

      res.json({
        data: post,
        status: 200,
      });
    });
  });
};

//# CREATE

const store = (req, res) => {
  // const { title, content, image, tags } = req.body;
  // let maxId = 0;
  // for (const post of posts) {
  //   if (post.id > maxId) maxId = post.id;
  // }
  // const postId = maxId + 1;
  // const newPost = { id: postId, title, content, image, tags };
  // posts.push(newPost);
  // res.status(201);
  // res.json(newPost);
};

//# UPDATE

const update = (req, res) => {
  //   const id = parseInt(req.params.id);
  //   const post = posts.find((currentPost) => currentPost.id === id);
  //   if (!post) {
  //     res.status(404);
  //     return res.json({
  //       message: "Post non trovato",
  //       error: "Not found",
  //       status: 404,
  //     });
  //   }
  //   const { title, content, image, tags } = req.body;
  //   const updatedPost = { id: id, title, content, image, tags };
  //   posts.splice(posts.indexOf(post), 1, updatedPost);
  //   res.json(updatedPost);
};
const modify = (req, res) => {
  // res.json({ message: "modifica parziale del post" });
};

//# DELETE

const destroy = (req, res) => {
  const postId = parseInt(req.params.id);
  const sql = `DELETE FROM posts WHERE id = ? `;
  connection.query(sql, [postId], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete a post" });
    res.sendStatus(204);
  });
};

module.exports = { index, show, store, update, modify, destroy };
