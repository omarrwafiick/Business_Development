import api from './api'; 
const applicationDomain = "/application";

export const addApplicationForService = async (applicantid, data) => api.post(applicationDomain+`/add-service-application/${applicantid}`, data);

export const getConsultantApplications= async (id) => api.get(applicationDomain+`/consultant-applications/${id}`);
 
export const getApplicationStatus = async ( applicationid ) => api.get(applicationDomain+`/getstatus/${applicationid}`);

export const updateApplicationForService = async (applicationid, data) => api.put(applicationDomain+`/${applicationid}`, data);

export const updatePaymentStatusService = async (applicationid, data) => api.put(applicationDomain+`/paymentstatus/${applicationid}`, data);