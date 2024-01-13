import ArticleService from '../../services/articles/ArticleService.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();
const articleService = new ArticleService();
/**
 * メモ新規登録
 */
router.post('/deleteArticle', authenticate, async (req, res, next) => {
  try {
    const { user_id, memo_id } = req.body;
    console.info(`delArticle.router=========== ${memo_id} =============================`);

    // 記事を削除
    const delArticle = await articleService.deleteArticle(user_id, memo_id);

    // 返却用データを生成
    // const body = newArticle.map((article) => ({
    //   id: newArticle.id,
    //   title: newArticle.title,
    //   content: newArticle.content,
    //   author: newArticle.author,
    //   date: new Date(newArticle.createdDate),
    // }));
    // console.log(`😄😄😄=============${delArticle} 😄😄😄😄`);
    res.status(200).json(delArticle);
  } catch (error) {
    console.error(`👹👹👹👹👹👹👹👹👹${error}`);
    res.status(500).json({});
  }
});

export default router;
