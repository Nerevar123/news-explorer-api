const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.saveArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
  // notFoundError
    .orFail(new Error('cardNotFound'))
    .then((data) => {
      // eslint-disable-next-line eqeqeq
      if (data.owner != req.user._id) {
        // next? ForbError
        throw new Error('forbidden');
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then((article) => res.send(article));
    })
    .catch(next);
};
