import ArticleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();
const articleService = new ArticleService();
/**
 * メモ削除
 */
router.post('/deleteArticle', authenticate, async (req, res, next) => {
  try {
    const { user_id, memo_id } = req.body;
    console.info(`delArticle.router=========== ${memo_id} =============================`);

    // 記事を削除
    const delArticle = await articleService.deleteArticle(user_id, memo_id);

    res.status(200).json(delArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
