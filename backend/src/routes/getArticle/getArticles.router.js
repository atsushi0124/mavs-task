import ArticleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();
const articleService = new ArticleService();
/**
 * メモ新規登録
 */
router.post('/getArticle', authenticate, async (req, res, next) => {
  try {
    const { user_id } = req.body;

    // 記事を取得
    const newArticle = await articleService.getArticleList(user_id);

    // 返却用データを生成
    const body = newArticle.map(() => ({
      id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
      author: newArticle.author,
      date: new Date(newArticle.createdDate),
    }));
    res.status(200).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
