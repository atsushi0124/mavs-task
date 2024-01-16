import ArticleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();
const articleService = new ArticleService();
/**
 * メモ削除
 */
router.post('/updateArticle', authenticate, async (req, res, next) => {
  try {
    const { user_id, memo_id, memo_title, memo_desc } = req.body;
    console.info(`upDate 👹.router=========== ${memo_id} =============================`);

    // メモを更新
    const updateArticle = await articleService.updateArticle(
      user_id,
      memo_id,
      memo_title,
      memo_desc
    );

    res.status(200).json(updateArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
