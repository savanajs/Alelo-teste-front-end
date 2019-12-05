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
    show: (idCategory, idList) => `${BASE_URL_API}/categories/${idCategory}/lists/${idList}`,
    store: idCategory => `${BASE_URL_API}/categories/${idCategory}/lists`,
    update: (idCategory, idList) => `${BASE_URL_API}/categories/${idCategory}/lists/${idList}`,
    destroy: (idCategory, idList) => `${BASE_URL_API}/categories/${idCategory}/lists/${idList}`,
  },
  items: {
    index: (idCategory, idList) => `${BASE_URL_API}/categories/${idCategory}/lists/${idList}/items`,
    show: (idCategory, idList, idItem) => `${BASE_URL_API}/categories/${idCategory}/lists/${idList}/items/${idItem}`,
    store: (idCategory, idList) => `${BASE_URL_API}/categories/${idCategory}/lists/${idList}/items`,
    update: (idCategory, idList, idItem) => `${BASE_URL_API}/categories/${idCategory}/lists/${idList}/items/${idItem}`,
    destroy: (idCategory, idList, idItem) => `${BASE_URL_API}/categories/${idCategory}/lists/${idList}/items/${idItem}`,
  },
}
