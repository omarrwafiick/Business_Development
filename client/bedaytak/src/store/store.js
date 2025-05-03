import { create } from 'zustand';


const extractRole = (token)=>{
  const payloadBase64 = token.split('.')[1];
  const payloadJson = atob(payloadBase64);  
  const payload = JSON.parse(payloadJson);  
  return payload.userRole;
}

const AppStore = create((set) => ({
  applicationId:null,
  applicantId:null,
  consultandId:null,
  services:[],
  serviceName:null,
  setServiceName: (name) => set({ serviceName: name }),
  chosenService:null,
  categories:[],
  user:null,
  token:'',
  isAuthenticated:false,
  error:null,
  isLoading:false,  
  role: null,
  setToken: (newToken) => {
    const userRole = extractRole(newToken);
    set({ token: newToken, role: userRole, isAuthenticated: true });
  },
}));

export default AppStore;

//  const { count, increment, decrement, reset } = useStore(); // Access the store state and actions
