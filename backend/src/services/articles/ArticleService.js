import db from '../../models/articles.js';
import AuthService from '../auth/AuthService.js';

// import nanoid from 'nanoid';
const authService = new AuthService();

// クラス
class ArticleService {
  /**
   * 記事一覧取得
   * @param user_id
   * @return ランダム値
   */
  async getArticleList(user_id) {
    // ユーザーIDをキーにメモの記事を取得
    const rows = await db.Articles.findOne({ where: { id: user_id } });
    console.log(rows.dataValues);

    // 取得したデータを返却形式に整形して格納し返却する
    const resData = {
      id: rows.dataValues.id,
      title: rows.dataValues.title,
      content: rows.dataValues.content,
      createdDate: rows.dataValues.created_at,
    };
    return resData;
  }
  /**
   * 記事情報取得
   * @param user_id
   * @return ランダム値
   */
  getArticle(user_id, article_id) {
    return {};
  }
}

export default ArticleService;

// // クラス
// class UserService {
//   /**
//    * ユーザー情報取得
//    * @param ユーザーID
//    * @return ユーザー情報
//    */
//   async getUser(user_id) {
//     // ユーザーIDをキーにユーザー情報を取得する
//     const rows = await db.Users.findOne({ where: { id: user_id } });
//     console.log(rows.dataValues);
//     // 取得したデータを返却形式に整形して格納し返却する
//     const resData = {
//       id: rows.dataValues.id,
//       name: rows.dataValues.name,
//       email: rows.dataValues.email,
//     };
//     return resData;
//   }

//   /**
//    * ユーザー情報検索
//    * @param 検索条件
//    * @return ユーザー情報リスト
//    */
//   async searchUser(id, name, email, password) {
//     const where = {};
//     // IDが指定されている場合はIDを条件へ追加する
//     if (id) {
//       where.id = id;
//     }
//     // 名前が指定されている場合は名前を条件へ追加する
//     if (name) {
//       where.name = name;
//     }
//     // メールアドレスが指定されている場合はメールアドレスを条件へ追加する
//     if (email) {
//       where.email = email;
//     }
//     // パスワードが指定されている場合はパスワードを条件へ追加する
//     if (password) {
//       const hash_password = authService.hashSha256(password);
//       where.password = hash_password;
//     }

//     // 検索実行
//     const rows = await db.Users.findAll({ where });

//     // 取得したデータを返却形式に整形して格納し返却する
//     const resDataList = [];
//     for (const row of rows) {
//       const resData = {
//         id: row.dataValues.id,
//         name: row.dataValues.name,
//         email: row.dataValues.email,
//       };
//       // 返却用リストへ格納する
//       resDataList.push(resData);
//     }

//     return resDataList;
//   }
// }

// export default UserService;
