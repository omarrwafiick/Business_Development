import create from 'zustand';

const useStore = create((set) => ({
  applicationId:null,
  applicantId:null,
  consultandId:null,
  services:[],
  chosenService:null,
  categories:[],
  user:null,
  token:null,
  isAuthenticated:false,
  error:null,
  isLoading:false,  
  role : extractRole(token),
}));
 
export default useStore;

const extractRole = (token)=>{
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);  
    const payload = JSON.parse(payloadJson);  
    return payload.userRole;
}
//  const { count, increment, decrement, reset } = useStore(); // Access the store state and actions
