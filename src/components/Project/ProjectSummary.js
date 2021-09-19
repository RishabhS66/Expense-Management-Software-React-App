import React from "react";
import { useParams } from "react-router";
import ProjectSummaryHeader from "./ProjectSummaryHeader";
import ProjectSummaryDashboard from "./ProjectSummaryDashboard";
import { Redirect } from "react-router-dom";

const ProjectSummary = () => {
  const { pid } = useParams();
  if(pid === undefined){
    return(<Redirect to="/projects" />);
  }
  
  return (
    <div>
      <ProjectSummaryHeader />
      <br />
      <ProjectSummaryDashboard id={pid}/> 
    </div>
  );
};

export default ProjectSummary;
