import axios from 'axios';

export const getList = async () => {
  try {
    const url = `https://cultureexpress.taipei/OpenData/Event/C000003`;
    const request = await axios.get(url);
    return request.data;
  } catch (e) {
    console.log('getList error::::', e);
  }
};
