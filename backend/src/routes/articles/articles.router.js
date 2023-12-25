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

    //メモの存在チェック
    const resSearchDesc = await userService.searchUser('', title, content, '', created_at, '');

    // 返却用データを生成
    const body = {
      title: title,
      content: created_at,
    };

    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
  // try {
  //   let body = {};

  //   res.status(200).json(body);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({});
  // }
});

export default router;
