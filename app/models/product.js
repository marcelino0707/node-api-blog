const dbConnection = require('../helper/database')

const db = new dbConnection();

class Product {
  static async getAll() {
    try {
      const result = await db.query('SELECT id, fNamaProduk, fDeskripsi, fHarga, fImage, fKategori FROM tproduk WHERE fDelete = 0', 'R');
      return result
    } catch (error) {
      throw error
    }
  }

  static async getById(id) {
    try {
      const result = await db.execute("SELECT id, fNamaProduk, fDeskripsi, fHarga, fImage, fKategori FROM tproduk WHERE id = ? AND fDelete = 0", id, 'R');
      return result
    } catch (error) {
      throw error
    }
  }

  static async create(product) {
    try {
      const result = await db.execute("INSERT INTO tproduk SET ?", product, 'CUD')
      return result
    } catch (error) {
      throw error
    }
  }

  static async update(id, product) {
    try {
      const { fNamaProduk, fDeskripsi, fHarga, fKategori } = product
      const result = await db.execute('UPDATE tproduk SET fNamaProduk = ?, fDeskripsi = ?, fHarga = ?, fKategori = ?  WHERE id = ?', [fNamaProduk, fDeskripsi, fHarga, fKategori, id], 'CUD')
      return result
    } catch (error) {
      throw error
    }
  }

  static async delete(id) {
    try {
      const result = await db.execute('UPDATE tproduk SET fDelete = 1 WHERE id = ?', id, 'CUD')
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = Product;