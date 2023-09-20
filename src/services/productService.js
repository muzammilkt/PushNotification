import API from "./API";

export const CreateProduct = async (data) => API.post('product', data);
export const DeleteProduct = async (id) => API.delete(`product/${id}`);
export const EditProduct = async (id, data) => API.patch(`product/${id}`, data);
export const ListAllProducts = async () => API.get('product');

//
export const AddFcm = async (data) => API.post('product/fcm', data);