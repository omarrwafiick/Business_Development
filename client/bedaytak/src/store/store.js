import create from 'zustand';

const useStore = create((set) => ({
  applicationId:null,
  applicantId:null,
  service:null,
  user:null,
  token:null,
  isAuthenticated:false,
  error:null,
  isLoading:false,  
}));
 
export default useStore;

//  const { count, increment, decrement, reset } = useStore(); // Access the store state and actions
