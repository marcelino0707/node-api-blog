const dbConnection = require('../helper/database')

const db = new dbConnection();

class Slider {
  static async getAll() {
    try{
      const result = await db.query('SELECT id, fFile, fDeskripsi, fStatus FROM tslider WHERE fDelete = 0', 'R');
      return result
    } catch (error) {
      throw error
    }
  }

  static async getById(id) {
    try {
      const result = await db.execute("SELECT id, fFile, fDeskripsi, fStatus FROM tslider WHERE id = ? AND fDelete = 0", id, 'R');
      return result
    } catch (error) {
      throw error
    }
  }

  static async create(slider) {
    try {
      const result = await db.execute("INSERT INTO tslider SET ?", slider, 'CUD');
      return result
    } catch (error) {
      throw error
    }
  }

  static async update(id, slider) {
    try { 
      const { fFile, fDeskripsi, fStatus} = slider
      const result = await db.execute('UPDATE tslider SET fFile = ?, fDeskripsi = ?, fStatus = ? WHERE id = ?', [fFile, fDeskripsi, fStatus, id], 'CUD');
      return result
    } catch (error) {
      throw error
    }
  }

  static async delete(id) {
    try {
      const result = await db.execute('UPDATE tslider SET fDelete = 1 WHERE id = ?', id, 'CUD');
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = Slider;