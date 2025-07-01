import api from './api';
const entrepreneurDomain = "/service/entrepreneur";
const consultantDomain = "/service/consultant";

export const addApplicationForService = async (applicantid, data) => api.post(entrepreneurDomain+`/add-service-application/${applicantid}`, data);

export const businessGuideService = async (applicantid, applicationid, data) => api.post(entrepreneurDomain+`/business-guide/${applicantid}/${applicationid}`, data);

export const salesOptimizationService = async (applicantid, applicationid, data) => api.post(entrepreneurDomain+`/sales-revenue-optimization/${applicantid}/${applicationid}`, data);

export const getSalesOptimizationServiceFree = async (applicantid, applicationid) => api.get(entrepreneurDomain+`/sales-revenue-optimization-free-trial-service/${applicantid}/${applicationid}`);

export const getSalesOptimizationServicePremium= async (applicantid, applicationid) => api.get(entrepreneurDomain+`/sales-revenue-optimization-premium-service/${applicantid}/${applicationid}`);

export const locationMarkrtAnalysisService = async (applicantid, applicationid) => api.post(entrepreneurDomain+`/location-markrt-analysis-service/${applicantid}/${applicationid}`);

export const getLocationMarkrtAnalysisServiceFree = async (applicantid, applicationid) => api.get(entrepreneurDomain+`/location-markrt-analysis-free-trial-service/${applicantid}/${applicationid}`);

export const getLocationMarkrtAnalysisServicePremium= async (applicantid, applicationid) => api.get(entrepreneurDomain+`/location-markrt-analysis-premium-service/${applicantid}/${applicationid}`);

export const financialPlanningService = async (applicantid, applicationid, data) => api.post(entrepreneurDomain+`/financial-planning-service/${applicantid}/${applicationid}`, data);

export const getFinancialPlanningServiceFree = async (applicantid, applicationid) => api.get(entrepreneurDomain+`/financial-planning-free-trial-service/${applicantid}/${applicationid}`);

export const getFinancialPlanningServicePremium= async (applicantid, applicationid) => api.get(entrepreneurDomain+`/financial-planning-premium-service/${applicantid}/${applicationid}`);

export const getConsultantApplications= async (id) => api.get(entrepreneurDomain+`/consultant-applications/${id}`);

export const getApplicationStatus = async ( applicationid ) => api.get(entrepreneurDomain+`/getstatus/${applicationid}`);

export const updateApplicationForService = async (applicationid, data) => api.put(entrepreneurDomain+`/${applicationid}`, data);

export const updatePaymentStatusService = async (applicationid, data) => api.put(entrepreneurDomain+`/paymentstatus/${applicationid}`, data);

export const seedConsultantService = async (applicantid, applicationid, data) => api.post(entrepreneurDomain+`/seed-consultant/${applicantid}/${applicationid}`, data);
 
export const consultancyService = async (applicantid, applicationid, consultencyid, data) => api.post(entrepreneurDomain+`/consultancy/${applicantid}/${applicationid}/${consultencyid}`, data);

export const getConsultancyServiceResult = async (applicantid) => api.get(consultantDomain+`/consultancy/${applicantid}`);

export const getAllServices= async () => api.get(entrepreneurDomain);

export const getIntegratedReport = async (applicantid) => api.get(entrepreneurDomain+`/report/${applicantid}`);
