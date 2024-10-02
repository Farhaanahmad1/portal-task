<template>
  <div class="container mt-5">
    <h2 class="text-center">Reset Password</h2>
    <form @submit.prevent="resetPassword">
      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password:</label>
        <input type="password" id="newPassword" v-model="newPassword" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Set Password</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const newPassword = ref('');
const confirmPassword = ref('');

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Get the token from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const response = await axios.post('http://192.168.15.156:8080/api/reset-password', {
      token,
      newPassword: newPassword.value,
    });

    if (response.status === 200) {
      alert("Password reset successfully!");
      router.push('/login'); // Redirect to login page
    } else {
      alert("Failed to reset password. Please try again.");
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    alert("An error occurred. Please try again.");
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>