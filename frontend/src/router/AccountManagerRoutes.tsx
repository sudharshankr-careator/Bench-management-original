import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/account-manager/Dashboard';
import ManageResource from '../components/account-manager/ManageResource';
import ResourceDetails from '../components/account-manager/ResourceDetails';
import UpdateResource from '../components/account-manager/UpdateResource';
import ActiveResources from '../components/resource-manager/ActiveResources';
import CreateResource from '../components/resource-manager/CreateResource';
import InActiveResources from '../components/resource-manager/InActiveResources';
import Notes from '../components/resource-manager/Notes';
import Profile from '../containers/Profile';

export default function AccountManagerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/createresource" element={<CreateResource />} />
      <Route path="/manageresource" element={<ManageResource />} />
      <Route path="/manageresource/:code" element={<ManageResource />} />
      <Route path="/updateresource/:id" element={<UpdateResource />} />
      <Route path="/resourcedetails/:id" element={<ResourceDetails />} />
      <Route path="/active" element={<ActiveResources />} />
      <Route path="/inactive" element={<InActiveResources />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notes/:id" element={<Notes />} />
    </Routes>
  );
}
