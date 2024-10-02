<template>
  <div class="container mt-5">
    <h2 class="text-center">Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <p class="mt-3">Don't have an account? <router-link to="/register">Student Registration</router-link></p>
      <p class="mt-3">
        <router-link to="/forgot-password">Forgot Your Password?</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('https://ecbb-103-31-104-208.ngrok-free.app/api/login', {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      const token = response.data.data.access_token; 
      const role = response.data.data.role; 

      localStorage.setItem('jwt', token); 
      localStorage.setItem('userRole', role); 

    
      if (role === 'admin') {
        router.push('/dashboard'); 
      } else if (role === 'manager') {
        router.push('/manager-dashboard'); 
      } else if (role === 'supervisor') {
        router.push('/supervisor-dashboard'); 
      }
       else {
        router.push('/student-dashboard'); 
      }
    }
  } catch (error) {
    console.error('Login failed', error);
    alert('Error logging in. Please try again.');
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 50px;
}

h2 {
  color: #007bff;
  margin-bottom: 30px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  width: 100%;
}

.btn-primary:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  margin-top: 20px;
}
</style>
