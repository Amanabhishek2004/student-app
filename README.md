

# Student Management System  

Welcome to **Student Management App**, a comprehensive platform designed for managing students' assignments, attendance, and grading, with distinct roles for principals, teachers, and students.

---

## Getting Started

### 1. Installation

To run the project locally, follow these steps:

1. Clone the repository:
   
   git clone 
   

2. Install the required packages from `requirements.txt`:

   pip install -r requirements.txt
 

3. Open the folder with **VSCode** and navigate to the project directory:

   cd ./backend


4. Start the backend development server:
  
   python manage.py runserver

5. Start the frontend development server
   cd ./vite-project
   npm run dev

7. Access the application:

   - **API Endpoint for All Students:**  
     [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)  
     *(You can also view individual student data using their primary key or by clicking on the student's name.)*

   - **Admin Dashboard for Database:**  
     [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## Login Credentials

### Principal Login:
- **Username**: `VAIDIK`  
- **Password**: `AMAN@2004`

### Teacher Logins:
- **Username**: `HARSH`  
  **Password**: `AMAN@2004`
  

### Student Logins:
- **Username**: `AMAN`  
  **Password**: `admin`
  
- **Username**: `NAMAN`  
  **Password**: `AMAN@2004`

### Admin (Database) Login:
- **Username**: `AMAN`  
  **Password**: `admin`

---

## Features

- **Staff and Student Login**:  
  Staff can view all student data, mark students as present or absent, and manage assignments. Students can only view their individual data.

- **Attendance Management**:  
  Teachers can mark students as present or absent, with buttons designed to be pressed only once per day, preventing proxy attendance.
- **Due Assignment Management**:
   ---- If a student the # of assignements he didnt submit are reflected there
   ---- If a staff he can view the students who didint submit the assignments given by him 
- **Assignment Drafting & Submission**:  
  Students can save assignments as drafts and continue editing them until final submission.  
  Teachers can view only the assignments submitted to them and grade them, while principals can view any assignment and modify the grades.

---

## Usage Guide

1. **Principal Privileges**:  
   The principal has full access to view and edit any student's data, assignments

2. **Teacher Privileges**:  
   Teachers can:
   - View all students' data.
   - Mark attendance for the day.
   - Grade only the assignments submitted to them.

3. **Student Privileges**:  
   Students can:
   - View their own data.
   - Draft and submit assignments.

4. **Assignment Management**:  
   The platform allows students to save assignments as drafts and submit them once completed. Teachers can view and grade these assignments, while principals have the authority to modify grades.

---

## Notifiers 

The # of new assignments given can also be viewd by a notification badge


## API Endpoints

- **View All Students**:  
  [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)

- **Admin Dashboard (Database)**:  
  [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)





Feel free to explore and contribute to this project! 🎉


 
