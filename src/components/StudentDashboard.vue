<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-0 sticky-top">
    <a class="navbar-brand" href="#">Student Dashboard</a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <button class="btn btn-logout" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-md-3 col-lg-2 sidebar">
        <h5 class="sidebar-title">Quizzes</h5>
        <div class="list-group">
          <button class="list-group-item list-group-item-action" @click="showSection('assigned')">
            Assigned Quizzes
          </button>
          <button class="list-group-item list-group-item-action" @click="showSection('pending')">
            Pending Quizzes
          </button>
          <button class="list-group-item list-group-item-action" @click="showSection('attempted')">
            Attempted Quizzes
          </button>
        </div>
      </div>
      <div class="col-md-9 col-lg-10 main-content">
        <div class="welcome-message">
          <h3>Welcome, {{ studentName }}!</h3>
        </div>
        <div v-if="currentSection === 'assigned'">
          <h4>Assigned Quizzes</h4>
          <div class="quiz-list">
            <ul class="list-group mb-4">
              <li class="list-group-item" v-for="quiz in assignedQuizzes" :key="quiz.id">
                <strong>{{ quiz.title }}</strong> - Due: {{ quiz.dueDate }}
                <button v-if="isQuizAvailable(quiz)" class="btn btn-primary mt-2" @click="attemptQuiz(quiz)">
                  Attempt Quiz
                </button>
                <small v-else class="text-muted">Available on: {{ quiz.availableDate }}</small>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="currentSection === 'pending'">
          <h4>Pending Quizzes</h4>
          <div class="quiz-list">
            <ul class="list-group mb-4">
              <li class="list-group-item" v-for="quiz in pendingQuizzes" :key="quiz.id">
                <strong>{{ quiz.title }}</strong> - Due: {{ quiz.dueDate }}
                <button class="btn btn-primary mt-2" @click="attemptQuiz(quiz)">
                  Attempt Quiz
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="currentSection === 'attempted'">
          <h4>Attempted Quizzes</h4>
          <div class="quiz-list">
            <ul class="list-group mb-4">
              <li class="list-group-item" v-for="quiz in attemptedQuizzes" :key="quiz.id">
                <strong>{{ quiz.title }}</strong> - Score: {{ quiz.score }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const studentName = ref('Student'); 

const currentSection = ref('assigned');
const assignedQuizzes = ref([]);
const pendingQuizzes = ref([]);
const attemptedQuizzes = ref([]);


const isQuizAvailable = (quiz) => {
  const today = new Date();
  const availableDate = new Date(quiz.availableDate);
  return today >= availableDate;
};


const attemptQuiz = (quiz) => {
  enableVideoRecording(); 
  alert(`You are attempting: ${quiz.title}`);
  

  const score = Math.floor(Math.random() * 100); 
  alert(`Quiz finished! Your score is: ${score}`);
};

// Function to enable mic and camera for video recording
const enableVideoRecording = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      const videoTracks = stream.getVideoTracks();
      console.log('Got stream with constraints:', stream);
      videoTracks[0].enabled = true; 
    })
    .catch((err) => {
      console.error('Error accessing media devices.', err);
      alert('Could not access camera or microphone.');
    });
};

const showSection = (section) => {
  currentSection.value = section;
};

const logout = () => {
  localStorage.removeItem('jwt'); 
  alert('Logged out successfully!');
  router.push('/'); 
};
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
</style>
