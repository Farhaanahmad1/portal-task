<template>
  <div class="supervisor-dashboard container">
    <h2>Welcome, Supervisor!</h2>
    <div class="dashboard-actions">
      <button class="btn btn-primary mb-3" @click="viewReports">View Reports</button>
      <button class="btn btn-secondary mb-3" @click="manageTeams">Manage Teams</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupervisorDashboard',
  methods: {
    viewReports() {
      alert("Redirect to view reports.");
    },
    manageTeams() {
      alert("Redirect to manage teams.");
    }
  }
}
</script>

<style scoped>
.supervisor-dashboard {
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
