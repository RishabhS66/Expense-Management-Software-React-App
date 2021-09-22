# Expense Management Software
```
Coded By: Rishabh Srivastava, Akash Yalla, Kanika Gupta
```
In these times of digitalization, all major organizations are aiming to automate most of their processes for better convenience. One important task for an organization involves the filing of expenses by employees for claiming reimbursements. These expenses also need to be approved / rejected by the appropriate authority.

A web application based on **react-redux** at the frontend and **Java** and **PostgreSQL** at the backend has been built to provide an automated solution to record and report business expenses.

This repository includes all the codes which the [Expense Management System](https://expense-management-system-rs.herokuapp.com/) website uses.

## Features
<ul type="square">
  <li> Login for employees (authentication with JWT Auth Token).
  <li> Add new employees when logged in as an _Administrator_.
  <li> Add new clients and projects.
  <li> Add new expenses with attachments.
  <li> View project and expense summaries.
  <li> Approval tab for approving / rejecting expense claims.
  <li> Feature to change password when the user wants.
  <li> The first time an employee logs in, they will have to set a strong password to access other features of the software. It is assumed that the _Administrator_ is responsible for creating an initial password for a new employee to log in.
  <li> Protected routing - allows all pages, except the Login page, to be accessed only after a user has logged in. 
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

If Login is successful, the user will be directed to **Home** page.
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134287731-7be7f0c9-8515-4ab2-a036-2986ab536b98.png">
  </kbd>
 </div>
 <br>

### Adding a New Employee
Steps to add a new employee -
1. The _Administrator_ has to be logged in. Only the user with _Administrator_ role will be able to access **Admin Options** on the navigation bar.
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
1. Whenever a new employee registered by the _Administrator_ logs in for the first time, they are redirected to **Change Password** page for setting a strong password to secure their account.

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
 
### Clients Tab
1. Clients can be added by any employee, irrespective of their role. 
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134295751-e511e7db-79b2-4ddb-9910-d852b2f9c074.png" width="450" height="280">
    <img src = "https://user-images.githubusercontent.com/39689610/134295774-0da8ae0a-906b-4584-ae7c-d9aeafa5bd03.png" width="450" height="280">
  </kbd>
 </div>
 <br>
 
2. The **Client Dashboard** is shown in the following image -
 <div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134296792-76f2bc3a-cf76-4b7a-acb9-ac1e069d6671.png">
  </kbd>
 </div>
 <br>
 
3. Clients are common to the organization and will be visible to all employees in the organization.
 
### Projects Tab
1. Projects can be added by any employee registered in the organization. 
2. Each project will have 1 _Project Manager_ mandatorily, and some other employees in the team. The employee who is adding the new project is automatically added as a team member.
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134298810-458d798f-8944-44fa-a558-db64bcbc56a0.png" width="300" height="188">
    <img src = "https://user-images.githubusercontent.com/39689610/134298798-3779d3db-380a-40e7-a2de-d4d008ce1a18.png" width="300" height="188">
    <img src = "https://user-images.githubusercontent.com/39689610/134298814-e48f7974-0cb6-4be5-907f-5f4d8a735ec1.png" width="300" height="188">
    </kbd>
 </div>
 <br>
 
 3. After a project has been added, you can view it in the dashboard. A project will only be visible in an employee's dashboard if they are a part of the project, or they have _Administrator_ privileges.
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134299896-2c3b6923-9d63-4f88-8a57-c8484c25dbec.png">
</kbd>
</div>
<br>

4. Detailed summary of the project can be viewed by choosing the **View Summary** option in the **Options** dropdown menu.
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134300501-6255b978-8045-48c3-be26-ec2889133f44.png" width="450" height="280">
  <img src = "https://user-images.githubusercontent.com/39689610/134300521-d3eb0bdf-e30a-44e9-94e6-d770404a1abe.png" width="450" height="280">
</kbd>
</div>
<br>

### Expenses Tab
1. All employees can file expenses. 
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134308306-51bba287-a040-4096-846b-2ba668bfe069.png" width="450" height="280">
  <img src = "https://user-images.githubusercontent.com/39689610/134308337-a02ff669-62b0-4fd6-abd4-526f3df23a05.png" width="450" height="280">
</kbd>
</div>
<br>

2. After filing the expense, it will be visible in the **Expenses Dashboard**. You can also view the invoice attached for the expense by clicking on **View Attachment** option in the **Options** dropdown.
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134308592-ff366ac8-ccf0-4e79-b7c3-324cc4a01913.png" width="450" height="280">
  <img src = "https://user-images.githubusercontent.com/39689610/134308623-22d68ba9-9696-49d8-8e51-5cb05262ddc9.png" width="450" height="280">
</kbd>
</div>
<br>
  
3. Details of the expense, including the invoice attached for the expense, can also be changed using the **Edit Expense** option.
4. An employee can also delete filed expenses, if required, using the **Delete** option.
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134321605-7159a372-203f-41a2-aadc-1c1690e5b156.png" width="450" height="280">
  <img src = "https://user-images.githubusercontent.com/39689610/134321625-63876516-50b2-4c5f-b622-da80abe78054.png" width="450" height="280">
</kbd>
</div>
<br>

### Approvals Tab
1. Authority for approval / rejection of an expense is according to the defined hierarchy. 
<ul> 
  <li>A normal employee cannot approve / reject any expense (first image). 
  <li>A <i>Project Manager</i> can approve / reject the expenses filed by the project team members, except expenses that the <i>Project Manager</i> has filed by himself / herself (second image). 
  <li> <i>Adminstrator</i> can approve / reject expenses filed by any of the employees (third image). 
</ul>
<div align = "center">
  <kbd>
    <img src = "https://user-images.githubusercontent.com/39689610/134315031-8707347d-6f56-4bcd-8876-a9b81328201f.png" width="300" height="188">
    <img src = "https://user-images.githubusercontent.com/39689610/134315047-9374f82d-ffbc-4653-9705-e8982e265245.png" width="300" height="188">
    <img src = "https://user-images.githubusercontent.com/39689610/134315051-b6cf7718-0ed8-4516-acd3-b2f7363103ba.png" width="300" height="188">
    </kbd>
 </div>
 <br>

2. The approver can click on **View Details** to view the detailed expense summary. The approver can also view the invoice for the filed expense by clicking on the _Attachment_ icon.
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134320070-7e89dd21-9ad0-4725-8d0b-c21759a33e0e.png">
</kbd>
</div>
<br>

3. On approving / rejecting the expense claim, the action will be reflected in the claimant's **Expenses Dashboard**.
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134320790-bfaa1b97-32a0-499f-b079-77bb1f588505.png">
</kbd>
</div>
<br>
 
### Employees Tab
1. A list of all employees is displayed here. You can also see the roles of each employee.
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134306610-3ffb0faa-fb4f-4980-9db5-297264f3acc2.png">
</kbd>
</div>
<br>

### Logging Out
User can log out by as shown in the following images -  
<div align = "center">
<kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134325673-f6683509-04a6-4454-b184-65b87eb5be40.png" width="162" height="128">
  </kbd>
  <kbd>
  <img src = "https://user-images.githubusercontent.com/39689610/134325677-c85c12e3-1aff-48f3-b8b0-55e7ced7e688.png" width="734" height="128">
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


