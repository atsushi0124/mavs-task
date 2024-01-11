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
router.post('/getArticle', authenticate, async (req, res, next) => {
  try {
    const { user_id } = req.body;
    console.info(`getArticle.router=========== ${user_id} =============================`);

    // 新しい記事を作成
    const newArticle = await articleService.getArticleList(user_id);

    let arr = newArticle;
    // 返却用データを生成
    const body = {
      id: newArticle.id,
      user_id: newArticle.author_id,
      title: newArticle.title,
      content: newArticle.content,
      createdDate: newArticle.createdDate,
    };

    // let newData = JSON.stringify(arr);

    console.log(`😄😄😄=============${body} 😄😄😄😄`);
    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
