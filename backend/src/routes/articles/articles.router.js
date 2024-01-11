import ArticleService from '../../services/articles/ArticleService.js';
import express from 'express';
import AuthService from '../../services/auth/AuthService.js';
import authenticate from '../../middleware/authenticate.js';
import config from '../../config/jwt-config.js';

const router = express.Router();
const articleService = new ArticleService();
/**
 * メモ新規登録
 */
router.post('/createArticle', authenticate, async (req, res, next) => {
  try {
    // // 認証用のトークン設定
    // const token = req.headers.token;
    // const decode = jwt.verify(token, config.jwt.secret);
    // console.log(decode);
    const { title, content, user_id } = req.body;
    console.info(`=========== ${user_id} =============================`);

    // 新しい記事を作成
    const newArticle = await articleService.createArticle(title, content, user_id);

    // 返却用データを生成
    const body = {
      id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
      user_id: newArticle.author_id,
    };
    console.log(body);
    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
