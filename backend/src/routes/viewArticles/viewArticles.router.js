import ArticleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();
const articleService = new ArticleService();
/**
 * メモを取得
 */
router.post('/viewArticle', authenticate, async (req, res, next) => {
  try {
    const { user_id, memo_id } = req.body;
    console.log(user_id);
    // 記事を取得
    const newArticle = await articleService.getArticle(user_id, memo_id);

    // 返却用データを生成
    const body = {
      id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
    };
    res.status(200).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
