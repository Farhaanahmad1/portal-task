<template>
  <div class="container mt-5">
    <h2 class="text-center">Forgot Your Password?</h2>
    <form @submit.prevent="sendResetRequest">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Send Reset Link</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const email = ref('');

const sendResetRequest = async () => {
  try {
    const response = await axios.post('https://ecbb-103-31-104-208.ngrok-free.app/api/forgot-password', {
      email: email.value,
    });

    if (response.status === 200) {
      alert("Reset link sent to your email!");
      router.push('/'); // Redirect to login page
    } else {
      alert("Failed to send reset link. Please try again.");
    }
  } catch (error) {
    console.error('Error sending reset link:', error);
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