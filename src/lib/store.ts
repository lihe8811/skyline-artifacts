import create from 'zustand';

interface ImageStore {
    imageUrl: string,
    updateImageUrl: (imageUrl: string) => void,
    displayUrl: string,
    updateDisplayUrl: (displayUrl: string) => void,
}

const useImageStore = create<ImageStore>((set) => ({
    imageUrl: '',
    updateImageUrl: (imageUrl: string) => set({ imageUrl: imageUrl }),
    displayUrl: '/placeholder-square.png',
    updateDisplayUrl: (displayUrl: string) => set({ displayUrl: displayUrl }),
}));

export default useImageStore;