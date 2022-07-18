// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.

const server = express();
// to enable parsing of json bodies for post requests
// server.use(express.json());

// TODO: your code to handle requests

server.use(express.json());

let id = 1;
let posts = [];

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  let mensaje = {
    error: "No se recibieron los parámetros necesarios para crear el Post",
  };
  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json(mensaje);
  }
  const post = { author, title, contents, id: id++ };
  posts.push(post);
  res.json(post);
});

server.post("/posts/author/:author", (req, res) => {
  const { author } = req.params;
  let { title, contents } = req.body;
  let mensaje = {
    error: "No se recibieron los parámetros necesarios para crear el Post",
  };
  if (!title || !contents) {
    return res.status(STATUS_USER_ERROR).json(mensaje);
  }
  const post = { author, title, contents, id: id++ };
  posts.push(post);
  res.json(post);
});

server.get("/posts", (req, res) => {
  let { term } = req.query;
  if (term) {
    let term_post = posts.filter(
      (p) => p.title.includes(term) || p.contents.includes(term)
    );
    return res.json(term_post);
  } else {
    res.json(posts);
  }
});

server.get("/posts/:author", (req, res) => {
  let { author } = req.params;
  let mensaje = {
    error: "No existe ningun post del autor indicado",
  };
  let author_post = posts.filter((p) => p.author === author);
  if (author_post.length > 0) {
    res.json(author_post);
  } else {
    return res.status(STATUS_USER_ERROR).json(mensaje);
  }
});

server.get("/posts/:author/:title", (req, res) => {
  let { author, title } = req.params;
  let mensaje = {
    error: "No existe ningun post con dicho titulo y autor indicado",
  };
  let new_post = posts.filter((p) => p.author === author && p.title === title);
  if (new_post.length > 0) {
    res.json(new_post);
  } else {
    return res.status(STATUS_USER_ERROR).json(mensaje);
  }
});

server.put("/posts", (req, res) => {
  let { id, title, contents } = req.body;
  let mensaje = {
    error: "No se recibieron los parámetros necesarios para modificar el Post",
  };
  if (id && title && contents) {
    // se utiliza el find ya que solo me va a mostrar un solo dato
    let id_post = posts.find((i) => i.id === parseInt(id)); //el parseInt es para que el parametro que me llegue siempre lo convierta a numero, es mayormente utilizado cuando los parametros llegan por params o por query. por lo general por body id siempre es un numero. Tambien se puede utilizar solo los dos iguales (==) que sirven para comparar el valor mas no el tipo de dato(string, numero, booleano etc)
    if (id_post) {
      (id_post.title = title), (id_post.contents = contents);
      res.json(id_post);
    } else {
      res.status(STATUS_USER_ERROR).json({ error: "id inexistente" });
    }
  } else {
    res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }
});

server.delete("/posts", (req, res) => {
  let { id } = req.body;
  const post = posts.find((i) => i.id === parseInt(id));
  if (!id || !post) {
    res.status(STATUS_USER_ERROR).json({ error: "id o post inexistente" });
  }
  posts = posts.filter((i) => i.id !== parseInt(id)); //filtramos los elementos que tengan un id diferente al que buscamos y los guardamos
  res.json({ success: true });
});

server.delete("/author", (req, res) => {
  let { author } = req.body;
  const author_found = posts.find((a) => a.author === author);
  if (!author || !author_found) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe el autor indicado" });
  }
  let delete_authors = [];
  //opcion 1

  //   delete_authors = posts.filter((a) => a.author === author);
  //   posts = posts.filter((a) => a.author !== author);

  // opcion 2

  posts = posts.filter((a) => {
    if (a.author !== author) {
      return true;
    } else {
      delete_authors.push(a);
    }
  });
  return res.json(delete_authors);
});

module.exports = { posts, server };
