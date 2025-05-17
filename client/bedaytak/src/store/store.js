import { create } from 'zustand';

const extractRole = (token)=>{
  const payloadBase64 = token.split('.')[1];
  const payloadJson = atob(payloadBase64);  
  const payload = JSON.parse(payloadJson);  
  return payload.userRole;
};

const AppStore = create((set) => ({
  applicationId:null,
  setApplicationId:(data) => set({ applicationId: data }),
  applicantId:null,
  setApplicantId:(data) => set({ applicantId: data }), 
  consultandId:null,
  setConsultandId:(data) => set({ consultandId: data }),
  services:[],
  setServices: (data) => set({ services: data }),
  serviceName:null,
  setServiceName: (name) => set({ serviceName: name }), 
  chosenService:null,
  setchosenService: (name) => set({ chosenService: name }),
  categories:[],
  setCategories: (data) => set({ categories: data }),
  user:null,
  setUser: (data) => set({ user: data }),
  token:'', 
  isAuthenticated:false,
  setIsAuthenticated: (data) => set({ isAuthenticated: data }),
  isLoading:false,  
  setIsLoading: (data) => set({ isLoading: data }),
  role: 'user',
  setToken: (newToken) => {
    const userRole = extractRole(newToken);
    set({ token: newToken, role: userRole, isAuthenticated: true });
  }, 
  consultationData:null,
  setconsultationData:(data) => set({ consultationData: data }),
  reviewData:null,
  setReviewData:(data) => set({ reviewData: data }),
}));

export default AppStore;
 
