import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProjects } from "../../actions/project";
import { getClients } from "../../actions/client";
import { getEmployees } from "../../actions/employees";
import { Redirect } from "react-router";
import ProjectHeader from "./ProjectHeader";
import ProjectDashboard from "./ProjectDashboard";

const Project = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects())
      .then(() => {
        // console.log("Projects fetched successfully");
        return;
      })
      .catch(() => {
        alert("Unable to fetch projects");
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getClients())
      .then(() => {
        // console.log("Clients fetched successfully");
        return;
      })
      .catch(() => {
        alert("Unable to fetch clients");
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployees())
      .then(() => {
        // console.log("Employees fetched successfully");
      })
      .catch(() => {
        alert("Unable to fetch employees");
      });
  }, [dispatch]);

  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div id="project">
      <ProjectHeader />
      <br />
      <ProjectDashboard />
    </div>
  );
};

export default Project;
