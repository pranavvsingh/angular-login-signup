/* eslint-disable guard-for-in */
/* eslint-disable no-useless-catch */
/* eslint-disable no-restricted-syntax */
const { query } = require('../db/db');

exports.insert = async (data, table) => {
  try {
    const columns = [];
    const values = [];
    // eslint-disable-next-line guard-for-in
    for (const key in data) {
      columns.push(key);
      if (typeof data[key] === 'string') {
        values.push(`"${data[key]}"`);
      } else if (typeof data[key] === 'number') {
        values.push(data[key]);
      } else if (typeof data[key] === 'object') {
        values.push(`'${JSON.stringify(data[key])}'`);
      }
    }
    await query(`INSERT INTO ${table} (${columns.join(',')}) VALUES (${values.join(',')});`);
    const insertedData = await query(`select * from ${table} ORDER BY userId DESC
        LIMIT 1; `);
    return insertedData;
  } catch (error) {
    throw error;
  }
};

exports.fetchByEmail = async (dbDetails) => {
  try {
    const { condition } = dbDetails;
    const consant = [];
    for (const key in condition) {
      consant.push(`${key}="${condition[key]}"`);
    }
    const whereCondition = consant.join(' and ');
    const rows = await query(`SELECT * FROM ${dbDetails.table} WHERE ${whereCondition}`);
    return rows;
  } catch (error) {
    throw error;
  }
};
