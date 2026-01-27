
import React from 'react';
import { Box, Typography, Paper, Stack, useTheme, useMediaQuery, Grid } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch, useSelector } from 'react-redux';
import { startUpload, updateProgress, completeUpload } from '../store/uploadSlice';
import { type RootState } from '../app/store';



const FilesPage: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const uploads = useSelector((state: RootState) => state.upload.uploads);

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const id = Math.random().toString(36).substring(7); // Simple random ID

            // Dispatch start upload
            dispatch(startUpload({
                id,
                fileName: file.name,
                size: (file.size / 1024).toFixed(2) + ' KB',
                type: file.type
            }));

            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10 + 5;
                if (progress > 100) progress = 100;

                dispatch(updateProgress({ id, progress }));

                if (progress === 100) {
                    clearInterval(interval);
                    dispatch(completeUpload({ id }));
                }
            }, 500);
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    // Dummy folders for UI

    // Get recent files from uploads (filter for completed, sort by recent if we had timestamps, take last 6)
    const recentFiles = Object.values(uploads)
        .filter(u => u.status === 'completed')
        .reverse() // Rough approximation of "recent" since object keys insertion order
        .slice(0, 8);

    return (
        <Box> 
            <Typography variant="h4" fontWeight={700} gutterBottom>
                File Manager
            </Typography>

            <Stack direction={isMobile ? 'column' : 'row'} spacing={4} sx={{ mt: 3 }}>
                {/* Sidebar / Filters (Left side) - demonstrating React Select */}
               

                {/* Main Content Area */}
                <Box sx={{ flexGrow: 1 }}>
                    {/* Upload Area */}
                    <Paper
                        {...getRootProps()}
                        sx={{
                            p: 5,
                            maxWidth:700,
                            border: '2px dashed',
                            borderColor: isDragActive ? 'primary.main' : 'divider',
                            borderRadius: 3,
                            bgcolor: isDragActive ? 'action.hover' : 'background.paper',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            mb: 4,
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: 'action.hover'
                            }
                        }}
                    >
                        <input {...getInputProps()} />
                        <CloudUploadIcon sx={{ fontSize: 64, color: isDragActive ? 'primary.main' : 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.primary">
                            {isDragActive ? "Drop the files here..." : "Drag & Drop files here"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            or click to browse from your computer
                        </Typography>
                    </Paper>

                    {/* Recent Files */}
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Recent Files ({recentFiles.length})
                    </Typography>
                    <Grid container spacing={2}>
                        {recentFiles.length === 0 && (
                            <Box sx={{ xs: 12, width: '100%' }}>
                                <Typography variant="body2" color="text.secondary">No files uploaded yet.</Typography>
                            </Box>
                        )}
                        {recentFiles.map((item) => (
                            <Box key={item.id} sx={{ xs: 12, sm: 6, md: 4, width: '45%' }}>
                                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid', borderColor: 'divider' }} elevation={0}>
                                    <Box sx={{ p: 1, bgcolor: 'primary.light', color: 'primary.main', borderRadius: 1, display: 'flex' }}>
                                        <InsertDriveFileIcon />
                                    </Box>
                                    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                        <Typography variant="subtitle2" noWrap title={item.fileName}>{item.fileName}</Typography>
                                        <Typography variant="caption" color="text.secondary">{item.size}</Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </Stack>
        </Box>
    );
};

export default FilesPage;
