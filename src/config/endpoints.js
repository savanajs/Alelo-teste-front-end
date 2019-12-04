const BASE_URL_API = 'https://5cfa67ebf26e8c00146d0756.mockapi.io';

export default {
  categories: {
    index: `${BASE_URL_API}/categories`,
    show: id => `${BASE_URL_API}/categories/${id}`,
    store: `${BASE_URL_API}/categories`,
    update: id => `${BASE_URL_API}/categories/${id}`,
    destroy: id => `${BASE_URL_API}/categories/${id}`
  },
  lists: {
    index: idCategory => `${BASE_URL_API}/categories/${idCategory}/lists`,
    show: (idCategory, id) => `${BASE_URL_API}/categories/${idCategory}/lists/${id}`,
    store: idCategory => `${BASE_URL_API}/categories/${idCategory}/lists`,
    update: (idCategory, id) => `${BASE_URL_API}/categories/${idCategory}/lists/${id}`,
    destroy: (idCategory, id) => `${BASE_URL_API}/categories/${idCategory}/lists/${id}`,
  },
  items: {
    index: (idCategory, idList) => `${BASE_URL_API}/categories/${idCategory}/lists${idList}/items`,
    show: (idCategory, idList, id) => `${BASE_URL_API}/categories/${idCategory}/lists${idList}/items/${id}`,
    store: (idCategory, idList) => `${BASE_URL_API}/categories/${idCategory}/lists${idList}/items`,
    update: (idCategory, idList, id) => `${BASE_URL_API}/categories/${idCategory}/lists${idList}/items/${id}`,
    destroy: (idCategory, idList, id) => `${BASE_URL_API}/categories/${idCategory}/lists${idList}/items/${id}`,
  },
}
