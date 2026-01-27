import React from "react";
import DataTable, { type TableRowData } from "../components/DataTable";
import ConfirmBox from "../components/ConfirmBox";


const usersData: TableRowData[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@gmail.com",
    role: "Editor",
    status: "Offline",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@gmail.com",
    role: "Viewer",
    status: "Active",
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha.singh@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 5,
    name: "Vikram Iyer",
    email: "vikram.iyer@gmail.com",
    role: "Editor",
    status: "Active",
  },
];




const Users: React.FC = () => {

  const [confirmState, setConfirmState] = React.useState<{
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  } | null>(null);


  const handleEdit = (user: TableRowData) => {
    setConfirmState({
      message: `Edit user ${user.name} functionality is not implemented yet.`,
      onConfirm: () => {
        setConfirmState(null);
        console.log("Edit confirmed:", user);
      },
      onCancel: () => {
        setConfirmState(null);
      }
    });
  };

  const handleDelete = (user: TableRowData) => {
    setConfirmState({
      message: `Are you sure you want to delete user ${user.name}?`,
      onConfirm: () => {
        console.log("Delete confirmed:", user);
        setConfirmState(null);
      },
      onCancel: () => {
        setConfirmState(null);
      }
    });
  };




  return (
    <>
      <DataTable
        title="Users Management"
        rows={usersData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {confirmState && (
        <ConfirmBox
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={confirmState.onCancel}
        />
      )}
    </>
  );
};

export default Users;
