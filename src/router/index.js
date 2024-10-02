// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import StudentRegistration from '../components/StudentRegistration.vue';
import Dashboard from '../components/Dashboard.vue';
import StudentDashboard from '../components/StudentDashboard.vue';
import ManagerDashboard from '../components/ManagerDashboard.vue'; // Import Manager Dashboard
import SupervisorDashboard from '../components/SupervisorDashboard.vue'; // Import Supervisor Dashboard
import ForgotPassword from '../components/ForgotPassword.vue'; // New import
import SetPassword from '../components/SetPassword.vue'; // Import SetPassword component

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: StudentRegistration },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/student-dashboard', name: 'StudentDashboard', component: StudentDashboard },
  { path: '/manager-dashboard', name: 'ManagerDashboard', component: ManagerDashboard }, // Manager route
  { path: '/supervisor-dashboard', name: 'SupervisorDashboard', component: SupervisorDashboard }, // Supervisor route
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword }, // New route
  { path: '/reset-password', name: 'SetPassword', component: SetPassword }, // New route for setting password
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard to protect routes and handle role-based access
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt'); // Check if JWT is stored
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage

  if (to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated) {
    next({ name: 'Login' }); // Redirect to login if not authenticated
  } else if (to.name === 'Dashboard' && userRole !== 'admin') {
    next({ name: 'Login' }); // Redirect if user is not admin trying to access admin dashboard
  } else if (to.name === 'ManagerDashboard' && userRole !== 'manager') {
    next({ name: 'Login' }); // Redirect if user is not manager trying to access manager dashboard
  } else if (to.name === 'SupervisorDashboard' && userRole !== 'supervisor') {
    next({ name: 'Login' }); // Redirect if user is not supervisor trying to access supervisor dashboard
  } else if (to.name === 'StudentDashboard' && userRole !== 'student') {
    next({ name: 'Login' }); // Redirect if user is not student trying to access student dashboard
  } else {
    next(); // Proceed to the route if authenticated and authorized
  }
});

export default router;
