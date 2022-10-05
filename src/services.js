const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getData = async (item = 'posts') => {
  try {
    const res = await fetch(`${BASE_URL}/${item}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getComments = async (id = 1) => {
  try {
    const res = await fetch(`${BASE_URL}/comments?postId=${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}