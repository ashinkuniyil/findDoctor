import axios from 'axios';

class Communication {
    private apiURL: string = 'https://www.nmc.org.in/MCIRest/open/getPaginatedData?service=getPaginatedDoctor&'
    private jsonAPIURL: string = 'https://www.nmc.org.in/MCIRest/open/getDataFromService?service=searchDoctor'
    private detailsModalURL: string = 'https://www.nmc.org.in/MCIRest/open/getDataFromService?service=getDoctorDetailsByIdImr'
    public getOnlyDataAPI = async (param: string): Promise<any[]> => {
        return axios.get(`${this.apiURL}${param}`).then((response) => {
            return response?.data?.data
        });
    }
    public postFromJsonAPI = async (data: {}): Promise<any[]> => {
        return axios.post(this.jsonAPIURL, data).then((response) => {
            return response?.data
        });
    }
    public postModalAPI = async (data: {}): Promise<any[]> => {
        return axios.post(this.detailsModalURL, data).then((response) => {
            return response?.data
        });
    }

}

export default Communication