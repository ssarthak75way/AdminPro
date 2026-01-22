
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FileUploadState {
    id: string;
    fileName: string;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    size: string;
    type: string;
}

interface UploadState {
    uploads: Record<string, FileUploadState>;
    isWidgetOpen: boolean;
    isWidgetMinimized: boolean;
}

const loadState = (): UploadState => {
    try {
        const serializedState = localStorage.getItem('uploadState');
        if (serializedState === null) {
            return {
                uploads: {},
                isWidgetOpen: false,
                isWidgetMinimized: false,
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            uploads: {},
            isWidgetOpen: false,
            isWidgetMinimized: false,
        };
    }
};

const initialState: UploadState = loadState();

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        startUpload: (state, action: PayloadAction<{ id: string; fileName: string; size: string; type: string }>) => {
            state.uploads[action.payload.id] = {
                ...action.payload,
                progress: 0,
                status: 'uploading',
            };
            state.isWidgetOpen = true;
            state.isWidgetMinimized = false;
            localStorage.setItem('uploadState', JSON.stringify(state));
        },
        updateProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
            const upload = state.uploads[action.payload.id];
            if (upload && upload.status === 'uploading') {
                upload.progress = action.payload.progress;
                if (action.payload.progress >= 100) {
                    upload.status = 'completed';
                    localStorage.setItem('uploadState', JSON.stringify(state));
                }
            }
        },
        completeUpload: (state, action: PayloadAction<{ id: string; error?: string }>) => {
            const upload = state.uploads[action.payload.id];
            if (upload) {
                upload.status = 'completed';
                upload.progress = 100;
                localStorage.setItem('uploadState', JSON.stringify(state));
            }
        },
        failUpload: (state, action: PayloadAction<{ id: string }>) => {
            const upload = state.uploads[action.payload.id];
            if (upload) {
                upload.status = 'error';
                localStorage.setItem('uploadState', JSON.stringify(state));
            }
        },
        setWidgetMinimized: (state, action: PayloadAction<boolean>) => {
            state.isWidgetMinimized = action.payload;
            localStorage.setItem('uploadState', JSON.stringify(state));
        },
        closeWidget: (state) => {
            state.isWidgetOpen = false;
            localStorage.setItem('uploadState', JSON.stringify(state));
        },
        removeUpload: (state, action: PayloadAction<string>) => {
            delete state.uploads[action.payload];
            localStorage.setItem('uploadState', JSON.stringify(state));
        },
        clearCompleted: (state) => {
            const newUploads: Record<string, FileUploadState> = {};
            Object.values(state.uploads).forEach(u => {
                if (u.status === 'uploading') {
                    newUploads[u.id] = u;
                }
            });
            state.uploads = newUploads;
            localStorage.setItem('uploadState', JSON.stringify(state));
        }
    },
});

export const { startUpload, updateProgress, completeUpload, failUpload, setWidgetMinimized, closeWidget, removeUpload, clearCompleted } = uploadSlice.actions;
export default uploadSlice.reducer;
