import axios from './axios';

export class CatService {
  async getCats(){
    const res = await axios.get('/breeds')
    .catch(error => {throw error.response})
    return await res;
  }

  async getImages(page, breed){
    const res = await axios.get(`/images/search?page=${page}&limit=10&breed_id=${breed}`)
    .catch(error => {throw error.response})
    return await res;
  }

  async getCatImage(id){
    const res = await axios.get(`/images/${id}`)
    .catch(error => {throw error.response})
    return await res;
  }
}
