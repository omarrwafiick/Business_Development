import api from './api';
const domain = "/service";

export const addApplicationForService = async (applicantid, data) => api.post(domain+`/add-service-application/${applicantid}`, data);

export const businessGuideService = async (applicantid, applicationid, data) => api.post(domain+`/business-guide/${applicantid}/${applicationid}`, data);

export const salesOptimizationService = async (applicantid, applicationid, data) => api.post(domain+`/sales-revenue-optimization/${applicantid}/${applicationid}`, data);

export const getSalesOptimizationServiceFree = async (applicantid, applicationid) => api.get(domain+`/sales-revenue-optimization-free-trial-service/${applicantid}/${applicationid}`);

export const getSalesOptimizationServicePremium= async (applicantid, applicationid) => api.get(domain+`/sales-revenue-optimization-premium-service/${applicantid}/${applicationid}`);

export const locationMarkrtAnalysisService = async (applicantid, applicationid) => api.post(domain+`/location-markrt-analysis-service/${applicantid}/${applicationid}`);

export const getLocationMarkrtAnalysisServiceFree = async (applicantid, applicationid) => api.get(domain+`/location-markrt-analysis-free-trial-service/${applicantid}/${applicationid}`);

export const getLocationMarkrtAnalysisServicePremium= async (applicantid, applicationid) => api.get(domain+`/location-markrt-analysis-premium-service/${applicantid}/${applicationid}`);

export const financialPlanningService = async (applicantid, applicationid, data) => api.post(domain+`/financial-planning-service/${applicantid}/${applicationid}`, data);

export const getFinancialPlanningServiceFree = async (applicantid, applicationid) => api.get(domain+`/financial-planning-free-trial-service/${applicantid}/${applicationid}`);

export const getFinancialPlanningServicePremium= async (applicantid, applicationid) => api.get(domain+`/financial-planning-premium-service/${applicantid}/${applicationid}`);

export const getConsultantApplications= async (id) => api.get(domain+`/consultant-applications/${id}`);

export const getApplicationStatus = async ( applicationid ) => api.get(domain+`/getstatus/${applicationid}`);

export const updateApplicationForService = async (applicationid, data) => api.put(domain+`/update/${applicationid}`, data);

export const updatePaymentStatusService = async (applicationid, data) => api.put(domain+`/update/paymentstatus/${applicationid}`, data);

export const seedConsultantService = async (applicantid, applicationid, data) => api.post(domain+`/seed-consultant/${applicantid}/${applicationid}`, data);
 
export const consultancyService = async (applicantid, applicationid, consultencyid, data) => api.post(domain+`/consultancy/${applicantid}/${applicationid}/${consultencyid}`, data);

export const getConsultancyServiceResult = async (applicantid, applicationid) => api.get(domain+`/consultancy/${applicantid}/${applicationid}`);

export const getAllServices= async () => api.get(domain+"/get-services");

export const getIntegratedReport = async (applicantid) => api.get(domain+`/report/${applicantid}`);
