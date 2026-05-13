const fetch = require('node-fetch');
const DB_URL = 'http://localhost:3001';

const findByUsername = async (username) => {
  const res = await fetch(`${DB_URL}/users?username=${encodeURIComponent(username)}`);
  const users = await res.json();
  return users[0] || null;
};

const findById = async (id) => {
  const res = await fetch(`${DB_URL}/users/${id}`);
  if (!res.ok) return null;
  return res.json();
};

const create = async (userData) => {
  const res = await fetch(`${DB_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};

module.exports = { findByUsername, findById, create };
