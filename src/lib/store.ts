import create from 'zustand';

interface GlobalState {
    imageUrl: string,
    updateImageUrl: (imageUrl: string) => void,
    displayUrl: string,
    updateDisplayUrl: (displayUrl: string) => void,
}

const useGlobalState = create<GlobalState>((set) => ({
    imageUrl: '',
    updateImageUrl: (imageUrl: string) => set({ imageUrl: imageUrl }),
    displayUrl: '/placeholder-square.png',
    updateDisplayUrl: (displayUrl: string) => set({ displayUrl: displayUrl }),
}));

export default useGlobalState;