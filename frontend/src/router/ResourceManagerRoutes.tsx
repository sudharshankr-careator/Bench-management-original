import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ResourceDetails from '../components/account-manager/ResourceDetails';
import ActiveResources from '../components/resource-manager/ActiveResources';
import CreateResource from '../components/resource-manager/CreateResource';
import Dashboard from '../components/resource-manager/Dashboard';
import InActiveResources from '../components/resource-manager/InActiveResources';
import ManageResource from '../components/resource-manager/ManageResource';
import Notes from '../components/resource-manager/Notes';
import UpdateResource from '../components/resource-manager/UpdateResource';
import Profile from '../containers/Profile';

export default function ResourceManagerRoutes() {
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
