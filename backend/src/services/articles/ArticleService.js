import db from '../../models/index.js';

// 記事に関する操作を行うクラス
class ArticleService {
  /**
   * ユーザーIDを元に記事一覧を取得するメソッド
   * @param user_id ユーザーID
   * @return 記事一覧データ
   */
  async getArticleList(user_id) {
    // ユーザーIDをキーに記事を取得
    const rows = await db.Articles.findAll({ where: { author_id: user_id } });
    console.log(rows.dataValues);

    // 取得したデータを返却形式に整形
    const resDataList = rows.map((row) => {
      return {
        id: row.dataValues.id,
        title: row.dataValues.title,
        content: row.dataValues.content,
        createdDate: row.dataValues.created_at,
      };
    });
    return resDataList;
  }

  /**
   * 新規記事を作成し、その情報をnewArticleに格納するメソッド
   * @param title タイトル
   * @param content　内容
   * @param user_id ユーザーID
   * @param created_at 作成した時間
   * @return 記事一覧データ
   */
  //
  async createArticle(title, content, user_id, created_at) {
    const newArticle = await db.Articles.create({
      title,
      content,
      author_id: user_id,
      created_at,
    });

    return newArticle;
  }

  /**
   * 記事情報を取得するメソッド
   * @param user_id ユーザーID
   * @param article_id 記事ID
   * @return 記事情報
   */
  async getArticle(user_id, memo_id) {
    const getArticle = await db.Articles.findOne({
      where: {
        id: memo_id,
        author_id: user_id,
      },
    });
    return getArticle;
  }

  /**
   * 記事情報を削除するメソッド
   * @param user_id ユーザーID
   * @param article_id 記事ID
   * @return 記事情報
   */
  async deleteArticle(user_id, memo_id) {
    const delArticle = await db.Articles.destroy({
      where: {
        id: memo_id,
        author_id: user_id,
      },
    });
    return delArticle;
  }

  /**
   * 記事情報を更新するメソッド
   * @param user_id ユーザーID
   * @param article_id 記事ID
   * @return 記事情報
   */
  async updateArticle(user_id, memo_id, title, content) {
    try {
      const articleData = {
        title: title,
        content: content,
      };
      const [updatedRows] = await db.Articles.update(articleData, {
        where: {
          id: memo_id,
          author_id: user_id,
        },
      });
      console.log(`${updatedRows} rows updated.`);
      return updatedRows;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  }
}

// ArticleServiceクラスをエクスポート
export default ArticleService;
