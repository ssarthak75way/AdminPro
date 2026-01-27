import React from "react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Tooltip,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export interface TableRowData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Offline";
}

interface DataTableProps {
  title: string;
  subtitle?: string;
  rows: TableRowData[];
  onEdit?: (row: TableRowData) => void;
  onDelete?: (row: TableRowData) => void;
}



const tableSx = {
  borderRadius: 4,
  p: 3,
  border: "1px solid",
  borderColor: "divider",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85))",
  backdropFilter: "blur(8px)",
}

const tableCellSx ={
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  color: "text.secondary",
  pb: 1.5,
}
const tableRowSx ={
  transition: "all 0.25s ease",
  "&:hover": {
    backgroundColor: "action.hover",
    transform: "scale(1.002)",
  },
}
const tableAvatarSx ={
  bgcolor: "primary.main",
  width: 42,
  height: 42,
  fontWeight: 700,
  fontSize: "1rem",
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
}
const tableChipSx = {
  fontWeight: 600,
  bgcolor: 'rgba(37, 99, 235, 0.1)',
  color: 'primary.main',
  borderRadius: '6px',
}
const actions = ["User", "Email", "Role", "Status", "Actions"];
const DataTable: React.FC<DataTableProps> = ({
  title,
  subtitle,
  rows,
  onEdit,
  onDelete,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
       ...tableSx,
      }}
    >
      {/* ===== Header / Toolbar ===== */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle || "Manage users and permissions"}
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search users..."
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{ mr: 1, color: "text.secondary" }}
                fontSize="small"
              />
            ),
          }}
          sx={{
            width: 260,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* ===== Table ===== */}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {actions.map((head) => (
                <TableCell
                  key={head}
                  align={head === "Actions" ? "right" : "left"}
                  sx={{
                   ...tableCellSx,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
               ...tableRowSx,
                }}
              >
                {/* User */}
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                       ...tableAvatarSx,
                      }}
                    >
                      {row.name.charAt(0)}
                    </Avatar>

                    <Box>
                      <Typography fontWeight={600} variant="body2">
                        {row.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        User ID #{row.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Email */}
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {row.email}
                  </Typography>
                </TableCell>

                {/* Role */}
                <TableCell>
                  <Chip
                    label={row.role}
                    size="small"
                    sx={{
                    ...tableChipSx,
                    }}
                  />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor:
                          row.status === "Active"
                            ? "success.main"
                            : "grey.400",
                        boxShadow: row.status === "Active" ? '0 0 8px rgba(34, 197, 94, 0.5)' : 'none'
                      }}
                    />
                    <Typography
                      variant="caption"
                      fontWeight={600}
                      color={
                        row.status === "Active"
                          ? "success.main"
                          : "text.secondary"
                      }
                    >
                      {row.status}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Actions */}
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Edit user">
                      <IconButton
                        size="small"
                        onClick={() => onEdit?.(row)}
                        sx={{
                          color: 'primary.main',
                          bgcolor: 'rgba(37, 99, 235, 0.08)',
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete user">
                      <IconButton
                        size="small"
                        onClick={() => onDelete?.(row)}
                        sx={{
                          color: 'error.main',
                          bgcolor: 'rgba(239, 68, 68, 0.08)',
                          "&:hover": {
                            bgcolor: "error.main",
                            color: "white",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ===== Pagination (Static Mock) ===== */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3} px={1}>
        <Typography variant="caption" color="text.secondary">
          Showing {rows.length} of 42 results
        </Typography>
        <Stack direction="row" spacing={1}>
          <Box sx={{ p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="body2" color="text.secondary">Prev</Typography>
          </Box>
          <Box sx={{ p: 1, borderRadius: 1, bgcolor: 'primary.main', color: 'white', px: 2, cursor: 'pointer', boxShadow: '0 4px 10px rgba(37,99,235,0.3)' }}>
            <Typography variant="body2" fontWeight={600}>1</Typography>
          </Box>
          <Box sx={{ p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="body2" color="text.secondary">2</Typography>
          </Box>
          <Box sx={{ p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="body2" color="text.secondary">3</Typography>
          </Box>
          <Box sx={{ p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="body2" color="text.secondary">Next</Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DataTable;
