import create from 'zustand';

const useStore = create((set) => ({
  count: 0, // initial state
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }), // resets count to 0
}));

export default useStore;

//  const { count, increment, decrement, reset } = useStore(); // Access the store state and actions
