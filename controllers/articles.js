const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { notFoundPageErrorMessage, forbiddenErrorMessage } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      articles.filter((article) => {
        if (article.owner.id === req.user.id) return article;
        return null;
      });
      res.send(articles);
    })
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
  Article.findById(req.params.id).select('+owner')
    .orFail(new NotFoundError(notFoundPageErrorMessage))
    .then((data) => {
      if (data.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenErrorMessage);
      }
      Article.findByIdAndRemove(req.params.id)
        .then((article) => res.send(article));
    })
    .catch(next);
};
