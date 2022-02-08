import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ResourceDetails from '../components/account-manager/ResourceDetails';
import CreateUser from '../components/admin/CreateUser';
import Dashboard from '../components/admin/Dashboard';
import ManageUser from '../components/admin/ManageUser';
import UpdateUser from '../components/admin/UpdateUser';
import CreateResource from '../components/resource-manager/CreateResource';
import ManageResource from '../components/resource-manager/ManageResource';
import Notes from '../components/resource-manager/Notes';
import UpdateResource from '../components/resource-manager/UpdateResource';
import Profile from '../containers/Profile';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/createuser" element={<CreateUser />} />
      <Route path="/updateuser/:id" element={<UpdateUser />} />
      <Route path="/manageuser" element={<ManageUser />} />
      <Route path="/manageuser/:code" element={<ManageUser />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createresource" element={<CreateResource />} />
      <Route path="/manageresource" element={<ManageResource />} />
      <Route path="/manageresource/:code" element={<ManageResource />} />
      <Route path="/updateresource/:id" element={<UpdateResource />} />
      <Route path="/resourcedetails/:id" element={<ResourceDetails />} />
      <Route path="/notes/:id" element={<Notes />} />
    </Routes>
  );
}
