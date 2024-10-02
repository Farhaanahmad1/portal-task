<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-0 sticky-top">
      <a class="navbar-brand" href="#">Admin Dashboard</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <button class="btn btn-logout" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="row vh-100">
      <div class="col-md-3 col-lg-2 sidebar">
        <h5 class="sidebar-title">Admin Options</h5>
        <div class="list-group">
          <button class="list-group-item list-group-item-action" @click="showSection('registered')">Registered Students</button>
          <button class="list-group-item list-group-item-action" @click="showSection('managers')">Add Managers & Assign Roles</button>
          <button class="list-group-item list-group-item-action" @click="showSection('studentRequests')">View Student Requests</button>
          <button class="list-group-item list-group-item-action" @click="showSection('assignQuizzes')">Assign Quizzes to Students</button>
          <button class="list-group-item list-group-item-action" @click="showSection('viewQuizzes')">View All Quizzes</button>
        </div>
      </div>

      <div class="col-md-9 col-lg-10 main-content">
        <div class="welcome-message">
          <h3>Welcome, Admin!</h3>
          <p>Manage your dashboard functionalities below.</p>
        </div>

        <div v-if="currentSection === 'registered'">
          <h4>Registered Students</h4>
          <div class="table-responsive">
            <table class="table table-hover table-striped table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in students" :key="index">
                  <td>{{ student.name }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.phone }}</td>
                  <td>
                    <button class="btn btn-success" @click="acceptStudent(index)">Accept</button>
                    <button class="btn btn-danger" @click="rejectStudent(index)">Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="currentSection === 'managers'">
          <h4>Add Managers & Assign Roles</h4>
          <form @submit.prevent="addManager">
            <div class="form-group">
              <label for="managerEmail">Manager Email</label>
              <input type="email" id="managerEmail" v-model="newManager.email" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="role">Assign Role</label>
              <select id="role" v-model="newManager.role" class="form-control" required>
                <option value="Manager">Manager</option>
                <option value="QuizMaster">Supervisor</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary mt-2">Add Manager</button>
          </form>

          <h5 class="mt-4">Assigned Managers</h5>
          <ul class="list-group">
            <li class="list-group-item" v-for="manager in managers" :key="manager.email">
              {{ manager.email }} - Role: {{ manager.role }}
            </li>
          </ul>
        </div>

        <div v-if="currentSection === 'studentRequests'">
          <h4>Student Requests</h4>
          <div class="table-responsive">
            <table class="table table-hover table-striped table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Request Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in studentRequests" :key="index">
                  <td>{{ student.name }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.requestType }}</td>
                  <td>
                    <button class="btn btn-success" @click="acceptStudentRequest(index)">Accept</button>
                    <button class="btn btn-danger" @click="rejectStudentRequest(index)">Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="currentSection === 'assignQuizzes'">
          <h4>Assign Quizzes to Students</h4>
          <form @submit.prevent="assignQuiz">
            <div class="form-group">
              <label for="studentSelect">Select Student</label>
              <select id="studentSelect" v-model="selectedStudent" class="form-control">
                <option v-for="student in students" :key="student.email" :value="student.email">
                  {{ student.name }} ({{ student.email }})
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="quizTitle">Quiz Title</label>
              <input type="text" id="quizTitle" v-model="quiz.title" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="quizDate">Quiz Date</label>
              <input type="date" id="quizDate" v-model="quiz.date" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary mt-2">Assign Quiz</button>
          </form>
        </div>

        <div v-if="currentSection === 'viewQuizzes'">
          <h4>All Quizzes</h4>
          <div class="table-responsive">
            <table class="table table-hover table-striped table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>Quiz Title</th>
                  <th>Date</th>
                  <th>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(quiz, index) in quizzes" :key="index">
                  <td>{{ quiz.title }}</td>
                  <td>{{ quiz.date }}</td>
                  <td>{{ quiz.assignedTo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

const students = ref();
const studentRequests = ref([]); // Mock student requests
const managers = ref([]); // List of managers
const quizzes = ref([]); // List of quizzes

const currentSection = ref('registered');
const newManager = ref({ email: '', role: 'Manager' });
const selectedStudent = ref('');
const quiz = ref({ title: '', date: '' });

const showSection = (section) => {
  currentSection.value = section;
};

const addManager = () => {
  managers.value.push({ ...newManager.value });
  newManager.value = { email: '', role: 'Manager' };
};

const acceptStudent = (index) => {
  alert(`Accepted ${students.value[index].name}`);
  // Logic to accept student in the backend (e.g., API call)
};

const rejectStudent = (index) => {
  alert(`Rejected ${students.value[index].name}`);
  // Logic to reject student in the backend (e.g., API call)
};

const acceptStudentRequest = (index) => {
  alert(`Accepted request from ${studentRequests.value[index].name}`);
};

const rejectStudentRequest = (index) => {
  alert(`Rejected request from ${studentRequests.value[index].name}`);
};

const assignQuiz = () => {
  quizzes.value.push({ ...quiz.value, assignedTo: selectedStudent.value });
  quiz.value = { title: '', date: '' };
};

const logout = () => {
  localStorage.removeItem('jwt'); // Clear the token
  alert('Logged out successfully!');
  router.push('/'); // Redirect to login page
};

// Fetch students data from API
const fetchStudents = async () => {
  const token = localStorage.getItem('jwt'); // Get JWT from local storage
  if (!token) {
    alert('No access token found. Please log in again.');
    return;
  }

  try {
    const response = await axios.get('https://ecbb-103-31-104-208.ngrok-free.app/api/applications', {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Add the token to the headers
      },
    });
    console.log(response.data.data.data , 'ads')
    if (response.data.message === 'success') {
      students.value = response.data.data.data;
    } else {
      alert('Failed to fetch students.');
    }
  } catch (error) {
    console.error(error);
    alert('Error fetching students.');
  }
};

onMounted(() => {
  fetchStudents();
  const acceptStudent = async (index) => {
  const student = students.value[index];
  const token = localStorage.getItem('jwt'); // Get JWT token from local storage

  if (!token) {
    alert('No access token found. Please log in again.');
    return;
  }

  try {
    // Show a loading message (optional)
    alert(`Processing acceptance for ${student.name}...`);

    // Send a POST request to the backend to accept the student
    const response = await axios.post(
      'https://ecbb-103-31-104-208.ngrok-free.app/api/accept-application',
      { id: student.id }, // Include the student ID in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    // Handle the response
    if (response.data.message === 'success') {
      alert(`Student ${student.name} has been accepted successfully you will receive a mail.`);
      // Optionally, remove the student from the list after acceptance
      students.value.splice(index, 1);
    } else {
      alert(`Failed to accept student ${student.name}.`);
    }
  } catch (error) {
    console.error('Error accepting student:', error);
    alert('An error occurred while accepting the student.');
  }
};

});
</script>

<style scoped>
body{
    overflow-y: none;
}
.container-fluid {
  background-color: #f9f9f9;
}

.sidebar {
  background-color: #343a40;
  color: white;
  padding: 20px;
  height: 100vh; /* Full height of the viewport */
}

.sidebar-title {
  color: #ffffff;
  margin-bottom: 15px;
}

.list-group-item {
  background-color: #343a40;
  color: white;
  border: none; /* Remove border */
}

.list-group-item:hover {
  background-color: #495057;
}

.main-content {
  padding: 20px; /* Add padding to main content */
  overflow-y: auto; /* Enable scrolling only if needed */
}

.welcome-message {
  margin-top: 20px;
}

.quiz-list {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-logout {
  background-color: #007bff; /* Set button color */
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #0056b3; /* Darker shade on hover */
}
.list-group-item-action:hover {
  background-color: #007bff;
  color: white;
}

.list-group-item {
  cursor: pointer;
}

.table th {
  background-color: #343a40;
  color: white;
}

.table th, .table td {
  text-align: center;
}
</style>
