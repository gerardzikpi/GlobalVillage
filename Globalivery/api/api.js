import axiosApi from './axiosClient'

export async function fetchUser(params) {
  try {
    const res = await axiosApi.get('/api/user', { params });
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function fetchProducts(){
  try {
    const res = await axiosApi.get('/products');
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// function fetchUser(){
//     const userresponse = axiosApi.get('/users');
//     return userresponse.data
// }

export async function fetchOrders(){
  try {
    const res = await axiosApi.get('/orders');
    return res.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function fetchCategories(){
  try {
    const res = await axiosApi.get('/categories');
    return res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}