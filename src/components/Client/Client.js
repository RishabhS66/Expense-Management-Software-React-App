import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import ClientDashboard from "./ClientDashboard";
import ClientHeader from "./ClientHeader";

const Client = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div id="client">
      <ClientHeader />
      <br />
      <ClientDashboard />
    </div>
  );
};

export default Client;
