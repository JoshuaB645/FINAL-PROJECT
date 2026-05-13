const fetch = require('node-fetch');
const DB_URL = 'http://localhost:3001';

const getAll = async (userId) => {
  const res = await fetch(`${DB_URL}/books?userId=${userId}`);
  return res.json();
};

const getById = async (id) => {
  const res = await fetch(`${DB_URL}/books/${id}`);
  if (!res.ok) return null;
  return res.json();
};

const create = async (bookData) => {
  const res = await fetch(`${DB_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  return res.json();
};

const update = async (id, bookData) => {
  const res = await fetch(`${DB_URL}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) return null;
  return res.json();
};

const remove = async (id) => {
  const res = await fetch(`${DB_URL}/books/${id}`, { method: 'DELETE' });
  return res.ok;
};

module.exports = { getAll, getById, create, update, remove };
