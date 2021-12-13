const express = require('express');
const News = require('../models/news');

const router = express.Router();



router.all('*', (req, res, next) => {
  if(!req.session.admin){
    res.redirect('login')

    return;
  }
  next();
})


/* GET home page. */
router.get('/', (req, res) => {
  // const newsData = new News({
  //   title: 'tytuł testowy',
  //   description: 'opis'
  // })
  // newsData.save((err) => {
  //   console.log(err);
  // })
  res.render('admin/index', { title: 'Admin' });
});


router.post('/news/add', (req, res) => {
  const body = req.body; 
  
  const newsData = new News(body);
  
  const errors = newsData.validateSync();

  
  newsData.save((err) => {
    console.log(err);
  });

  res.render('admin/news-form', { title: 'Dodaj news', errors });
});

module.exports = router;
