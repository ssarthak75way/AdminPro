
import React from 'react';
import { Box, Paper, Typography, IconButton, List, ListItem, LinearProgress, Collapse, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { setWidgetMinimized, closeWidget, clearCompleted } from '../store/uploadSlice';
import { AnimatePresence, motion } from 'framer-motion';

const UploadWidget: React.FC = () => {
    const dispatch = useDispatch();
    const { uploads, isWidgetOpen, isWidgetMinimized } = useSelector((state: RootState) => state.upload);

    const uploadList = Object.values(uploads);

    // Auto-close if no uploads? (Optional, maybe not requested)
    // if (!isWidgetOpen) return null; // Controlled by state

    if (!isWidgetOpen && uploadList.length === 0) return null;

    const activeCount = uploadList.filter(u => u.status === 'uploading').length;

    const handleToggleMinimize = () => {
        dispatch(setWidgetMinimized(!isWidgetMinimized));
    };

    const handleClose = () => {
        dispatch(closeWidget());
    };

    if (!isWidgetOpen) return null;

    return (
        <AnimatePresence>
            <Box
                component={motion.div}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1300,
                    width: 360,
                    maxWidth: '100%',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        overflow: 'hidden',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    {/* Header */}
                    <Box sx={{
                        bgcolor: '#1e1e1e', // Dark header
                        color: 'white',
                        px: 2,
                        py: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }}
                        onClick={handleToggleMinimize}
                    >
                        <Typography variant="subtitle2" fontWeight={600}>
                            {activeCount > 0 ? `Uploading ${activeCount} item${activeCount !== 1 ? 's' : ''}` : 'Uploads Completed'}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleToggleMinimize(); }} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {isWidgetMinimized ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleClose(); }} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Box>

                    {/* Content */}
                    <Collapse in={!isWidgetMinimized}>
                        <Box sx={{ maxHeight: 300, overflowY: 'auto', bgcolor: 'background.paper' }}>
                            <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="caption" sx={{ cursor: 'pointer', color: 'primary.main' }} onClick={() => dispatch(clearCompleted())}>
                                    Clear completed
                                </Typography>
                            </Box>
                            <List disablePadding>
                                {uploadList.map((file) => (
                                    <ListItem key={file.id} disablePadding sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                                <InsertDriveFileIcon color="action" />
                                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                                    <Typography variant="body2" noWrap title={file.fileName}>{file.fileName}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{file.size}</Typography>
                                                </Box>
                                                {file.status === 'completed' && <CheckCircleIcon color="success" fontSize="small" />}
                                                {file.status === 'error' && <ErrorIcon color="error" fontSize="small" />}
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={file.progress}
                                                    sx={{ flexGrow: 1, height: 4, borderRadius: 2 }}
                                                    color={file.status === 'error' ? 'error' : 'primary'}
                                                />
                                                <Typography variant="caption" color="text.secondary" sx={{ minWidth: 24, textAlign: 'right' }}>
                                                    {Math.round(file.progress)}%
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </ListItem>
                                ))}
                                {uploadList.length === 0 && (
                                    <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                                        <Typography variant="body2">No active uploads</Typography>
                                    </Box>
                                )}
                            </List>
                        </Box>
                    </Collapse>
                </Paper>
            </Box>
        </AnimatePresence>
    );
};

export default UploadWidget;
