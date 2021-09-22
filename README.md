# Expense Management Software
```
Coded By: Rishabh Srivastava, Akash Yalla, Kanika Gupta
```
In these times of digitalization, all major organizations are aiming to automate most of their processes for better convenience. One important task for an organization involves filing of expenses by employees for claiming reimbursements. These expenses also need to be approved / rejected by the appropriate authority.

A web application based on **react-redux** at frontend, and **Java** and **PostgreSQL** at backend has been built to provide an automated solution to record and
report business expenses.

This repository includes all the codes which the [Expense Management System](https://expense-management-system-rs.herokuapp.com/) website uses.

## Features
<ul type="square">
  <li> Login for employees (with JWT Auth Token)
  <li> Add new employees when logged in as an Administrator.
  <li> Add new clients and projects
  <li> Add new expenses with attachments
  <li> View project and expense summaries
  <li> Approval tab for approving / rejecting expense claims
  <li> Feature to change password when the user wants.
  <li> The first time an employee logs in, they will have to set a strong passsword to access other features of the software. It is assumed that the Administrator is responsible for creating initial password for a new employee to log in.
</ul>

## User Profiles for Demo
You can use the following credentials to view a demonstration of the software - 
<ul>
  <li> <b>Email</b>: rishabh@gmail.com, <b>Password</b>: 1234, <b>Role</b>: Administrator
  <li> <b>Email</b>: jdoe@gmail.com, <b>Password</b>: @Expense123, <b>Role</b>: Project Manager
  <li> <b>Email</b>: jndoe@gmail.com, <b>Password</b>: @Expense123, <b>Role</b>: Software Development Engineer
</ul> 

## Notes
1. The **backend code** for this project can be accessed at this [repo](https://github.com/RishabhS66/Expense-Management-Software-Backend).<br>
2. Both the frontend and backend components of the project have been hosted at [Heroku](https://www.heroku.com/). <br>
3. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


