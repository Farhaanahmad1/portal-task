<template>
  <div class="manager-dashboard container">
    <h2>Welcome, Manager!</h2>
    <div class="dashboard-actions">
      <button class="btn btn-primary mb-3" @click="viewStudentDetails">View Student Details</button>
      <button class="btn btn-secondary mb-3" @click="assignQuizzes">Assign Quizzes</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const viewStudentDetails = () => {
  
  alert("Redirect to view student details.");
};

const assignQuizzes = () => {

  alert("Redirect to assign quizzes.");
};
</script>

<style scoped>
.manager-dashboard {
  padding: 30px;
  margin-top: 50px;
  background-color: #f1f1f1;
  border-radius: 10px;
}

h2 {
  color: #007bff;
  margin-bottom: 20px;
}

.dashboard-actions {
  display: flex;
  flex-direction: column;
}

.btn-primary, .btn-secondary {
  width: 100%;
  margin-bottom: 10px;
}

.btn-primary:hover, .btn-secondary:hover {
  opacity: 0.8;
}
</style>
