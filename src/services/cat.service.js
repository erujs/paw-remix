import {
  dogInstance,
  catInstance
} from './axios';

export class CatService {
  async getCats(){
    const res = await dogInstance.get('/breeds')
    .catch(error => {throw error.response})
    return await res;
  }

  async getImages(page, breed){
    const res = await dogInstance.get(`/images/search?page=${page}&limit=10&breed_id=${breed}`)
    .catch(error => {throw error.response})
    return await res;
  }

  async getCatImage(id){
    const res = await dogInstance.get(`/images/${id}`)
    .catch(error => {throw error.response})
    return await res;
  }
}