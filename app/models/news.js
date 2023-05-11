const dbConnection = require('../helper/database')

const db = new dbConnection();

class News {
  static async getAll() {
    try {
      const result = await db.query('SELECT id, fJudul, fSlug, fConten, fImage, fKategori, fStatus, fPenulis FROM tnews WHERE fDelete = 0','R');
      return result
    } catch (error) {
      throw error
    }
  }

  static async getById(id) {
    try {
      const result = await db.execute("SELECT id, fJudul, fSlug, fConten, fImage, fKategori, fStatus, fPenulis FROM tnews WHERE id = ? AND fDelete = 0", id, 'R');
      return result
    } catch (error) {
      throw error
    }
  }

  static async create(news) {
    try {
      const result = await db.execute("INSERT INTO tnews SET ?", news, 'CUD')
      return result
    } catch (error) {
      throw error
    }
  }

  static async update(id, news) {
    try {
      const { fJudul, fSlug, fConten, fKategori, fStatus, fPenulis } = news
      const result = await db.execute('UPDATE tnews SET fJudul = ?, fSlug = ?, fConten = ?, fKategori = ?, fStatus = ?, fPenulis = ?  WHERE id = ?', [fJudul, fSlug, fConten, fKategori, fStatus, fPenulis, id], 'CUD')
      return result
    } catch (error) {
      throw error
    }
  }

  static async delete(id) {
    try {
      const result = await db.execute('UPDATE tnews SET fDelete = 1 WHERE id = ?', id, 'CUD')
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = News;