import express from 'express';
import authRouter from './auth/auth.router.js';
import usersRouter from './users/users.router.js';
import articlesRouter from './articles/articles.router.js';
import getArticlesRouter from './getArticle/getArticles.router.js';
import deleteArticleRouter from './deleteArticle/deleteArticle.router.js';
import viewArticleRouter from './viewArticle/viewArticles.router.js';
const router = express.Router();

// ルーティング設定
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('/getArticle', getArticlesRouter);
router.use('/deleteArticle', deleteArticleRouter);
router.use('/viewArticle', viewArticleRouter);

export default router;
