// src/api/api.js

const axios = require("axios");
const https = require("https");

// informar IP e Porta AWS
const api = axios.create({
  baseURL: "http://localhost",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Endpoints Api Laravel

exports.login = {
  auntenticar: p => api["post"]("login", p)
};

exports.produtos = {
  list: _ => api.get("produtos/"),
  listPorId: id => api.get(`produtos/${id}`),
  desativar: (payload) => api.post(`produtos/desativar/`, payload),
  save: p => api[p.id ? "put" : "post"]("produtos", p),
  del: id => api["delete"](`/produtos/${id}`)
};
exports.marcas = {
  list: _ => api.get("marcas/"),
  listPorId: id => api.get(`marcas/${id}`),
  save: p => api[p.id ? "put" : "post"]("marcas", p),
  del: id => api["delete"](`/marcas/${id}`)
};

exports.tipos = {
  list: _ => api.get("tipos/"),
  listPorId: id => api.get(`tipos/${id}`),
  save: p => api[p.id ? "put" : "post"]("tipos", p),
  del: id => api["delete"](`/tipos/${id}`)
};

exports.sabores = {
  list: _ => api.get("sabores/"),
  listPorId: id => api.get(`sabores/${id}`),
  save: p => api[p.id ? "put" : "post"]("sabores", p),
  del: id => api["delete"](`/sabores/${id}`)
};

exports.unidades = {
  list: _ => api.get("unidades/"),
  listPorId: id => api.get(`unidades/${id}`),
  save: p => api[p.id ? "put" : "post"]("unidades", p),
  del: id => api["delete"](`/unidades/${id}`)
};

