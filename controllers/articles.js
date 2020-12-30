const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

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
  Article.findById(req.params.id).select('+owner')
    .orFail(new NotFoundError('Запрашиваемая статья не найдена'))
    .then((data) => {
      // eslint-disable-next-line eqeqeq
      if (data.owner != req.user._id) {
        throw new ForbiddenError('Недостаточно прав для совершения операции');
      }
      Article.findByIdAndRemove(req.params.id)
        .then((article) => res.send(article));
    })
    .catch(next);
};
