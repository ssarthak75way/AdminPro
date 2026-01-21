import React from "react";
import DataTable, { type TableRowData } from "../components/DataTable";

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
  const handleEdit = (user: TableRowData) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user: TableRowData) => {
    console.log("Delete user:", user);
  };

  return (
    <DataTable
      title="Users Management"
      rows={usersData}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default Users;
