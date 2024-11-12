import create from 'zustand';

interface GlobalState {
    imageUrl: string,
    updateImageUrl: (imageUrl: string) => void,
}

const useGlobalState = create<GlobalState>((set) => ({
    imageUrl: '',
    updateImageUrl: (imageUrl: string) => set({ imageUrl: imageUrl }),
}));

export default useGlobalState;