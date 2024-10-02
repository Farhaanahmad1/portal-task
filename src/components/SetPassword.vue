<template>
  <div class="set-password-container">
    <h2 class="text-center">Reset Password</h2>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label for="newPassword">New Password</label>
        <input
          type="password"
          v-model="newPassword"
          id="newPassword"
          placeholder="Enter new password"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm new password"
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/stores'; // Make sure this path is correct
import axios from 'axios';

export default {
  setup() {
    const newPassword = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');
    const router = useRouter();
    const authStore = useAuthStore(); // Access the auth store

    const resetPassword = async () => {
      // Clear previous messages
      errorMessage.value = '';
      successMessage.value = '';

      // Check if the new password and confirmation match
      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match!";
        return;
      }

      try {
        // Send a request to the password reset endpoint
        const response = await axios.post('https://ecbb-103-31-104-208.ngrok-free.app/api/reset-password', {
          email: authStore.forgotPasswordEmail, // This should be set when user requests password reset
          password: newPassword.value
        });

        // Handle successful response
        if (response.status === 200) {
          successMessage.value = "Password reset successfully!";
          router.push({ name: 'Login' }); // Redirect to the login page
        } else {
          errorMessage.value = response.data.message || "Failed to reset password.";
        }
      } catch (error) {
        // Handle errors (network issues, server errors, etc.)
        console.error("Error resetting password:", error);
        errorMessage.value = error.response?.data?.message || "An error occurred while resetting the password.";
      }
    };

    return { newPassword, confirmPassword, resetPassword, errorMessage, successMessage };
  }
};
</script>

<style scoped>
.set-password-container {
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
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
