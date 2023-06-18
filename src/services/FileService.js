import axios from "axios"

const BASE_URL = "http://localhost:8080/file";

function FileService() {
   
    const getAllImages = () => {
        return axios.get(BASE_URL);
    };

    const uploadImage = (fileFormData) => {
        return axios.post(BASE_URL+'/upload', fileFormData);
    };

}
export default new FileService();