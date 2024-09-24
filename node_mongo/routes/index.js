const express = require('express');
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
  try {
    const docs = await db.findAll();
    res.render('index', { title: 'Lista de Clientes', docs });
  } catch (err) {
    next(err);
  }
});

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: {"name":"","age":""}, action: '/new'});
});

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const doc = await db.findOne(id);
    res.render('new', { title: 'Editando Cadastro', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
});

router.post('/new', async (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;

  try {
    const result = await db.insert({ name, age });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const age = parseInt(req.body.age);
 
  try {
    const result = await db.update(id, { name, age });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})


router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
 
  try {
    const result = await db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

module.exports = router;
