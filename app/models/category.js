const dbConnection = require('../helper/database')

const db = new dbConnection();

class Category {
  static async getAll() {
    try{
      const result = await db.query('SELECT id, fNamaKat, fSlugKat, fketerangan FROM tkategori WHERE fDelete = 0', 'R');
      return result
    } catch (error) {
      throw error
    }
  }

  static async getById(id) {
    try {
      const result = await db.execute("SELECT id, fNamaKat, fSlugKat, fketerangan FROM tkategori WHERE id = ? AND fDelete = 0", id, 'R');
      return result
    } catch (error) {
      throw error
    }
  }

  static async create(category) {
    try {
      const result = await db.execute("INSERT INTO tkategori SET ?", category, 'CUD');
      return result
    } catch (error) {
      throw error
    }
  }

  static async update(id, category) {
    try { 
      const { fNamaKat, fSlugKat, fketerangan} = category
      const result = await db.execute('UPDATE tkategori SET fNamaKat = ?, fSlugKat = ?, fketerangan = ? WHERE id = ?', [fNamaKat, fSlugKat, fketerangan, id], 'CUD');
      return result
    } catch (error) {
      throw error
    }
  }

  static async delete(id) {
    try {
      const result = await db.execute('UPDATE tkategori SET fDelete = 1 WHERE id = ?', id, 'CUD');
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = Category;