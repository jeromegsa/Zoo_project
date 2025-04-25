import api from "../../api/authConfig";

export const especeService={
    getAllEspece: async ()=>{
      const response= await api.get( '/especes/')
      return response.data

    }
}