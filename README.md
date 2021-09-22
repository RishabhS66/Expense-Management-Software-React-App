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
  <li> Login for employees (authentication with JWT Auth Token)
  <li> Add new employees when logged in as an Administrator.
  <li> Add new clients and projects
  <li> Add new expenses with attachments
  <li> View project and expense summaries
  <li> Approval tab for approving / rejecting expense claims
  <li> Feature to change password when the user wants.
  <li> The first time an employee logs in, they will have to set a strong passsword to access other features of the software. It is assumed that the Administrator is responsible for creating initial password for a new employee to log in.
  <li> Protected routing - allows all links, except Login page, to be accessed only after a user has logged in. 
</ul>

## Demonstration
### Login Page
The **Login** button gets activated only when the fields for Email and Password are both filled, and the Email entered has the correct format.

Invalid credentials causes alert pop-ups to appear, as shown in the following image -
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134283484-079f6b2d-b04b-4970-a49f-74d42c43ee76.png">
  </kbd>
 </div>
 <br>

### Adding a New Employee
Steps to add a new employee -
1. The administrator has to be logged in. Only the user with Administrator role will be able to access **Admin Options** on the navigation bar.
2. Click **Admin Options** -> **Add Employee**.
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134287363-0f78fabf-67b3-41ad-9f36-8ee46a4c84d0.png">
  </kbd>
 </div>
 <br>
 
3. Enter details about the employee.
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134284500-d0e42738-d55f-43b8-8c38-7ab455cfc2fd.png">
  </kbd>
 </div>
 <br>
 
4. If all fields are valid, the **Submit** button gets activated. Click it to add a new employee.
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134284524-cb84f266-5317-4098-9f28-4506b2bd379b.png">
  </kbd>
 </div>
 <br>
 
### Change Password
1. Whenever a new employee registered by the Administrator logs in for the first time, they are redirected to **Change Password** page for setting a strong password to secure their account.

2. Without setting a new password when logged in for the first time, the user will not be able to access any other functionality.

3. Some validations are performed while setting a new password. For example, the **New Password** field must match the **Confirm Password** field, but must also be different from the **Temporary or Old Password** field.
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134287005-2dfcb3a4-7c57-4f9a-9061-f3f631328771.png">
  </kbd>
 </div>
 <br>

4. The **Submit** button gets activated only when these validation conditions are met. 
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134285871-9ef8566a-1545-4536-ad14-b607305796f1.png">
  </kbd>
 </div>
 <br>
 
5. The user can also change their password whenever required. The **Change Password** page can be accessed as shown in the following image -
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134286789-1b3c5fe9-0253-4a33-99e1-faa616e3c82d.png">
  </kbd>
 </div>
 <br>
 
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


