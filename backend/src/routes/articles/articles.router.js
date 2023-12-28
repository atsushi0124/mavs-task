import articleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();

/**
 * メモ新規登録
 */
router.post('/createArticle', authenticate, async (req, res, next) => {
  try {
    // リクエストパラメーター
    const { title, content, created_at } = req.body;

    // 新しい記事を作成
    const newArticle = await articleService.createArticle(title, content, created_at);

    // 返却用データを生成
    const body = {
      id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
      created_at: newArticle.created_at,
    };

    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
