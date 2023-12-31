import articleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';
import config from '../../config/jwt-config.js';

const router = express.Router();

/**
 * メモ新規登録
 */
router.post('/createArticle', authenticate, async (req, res, next) => {
  try {
    // // 認証用のトークン設定
    // const token = req.headers.token;
    // const decode = jwt.verify(token, config.jwt.secret);
    // console.log(decode);
    // リクエストパラメーター
    const { title, content } = req.body;

    // 新しい記事を作成
    const newArticle = await articleService.createArticle('', title, content);

    // 返却用データを生成
    const body = {
      // id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
      // created_at: newArticle.created_at,
    };
    console.log(title, content);
    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
