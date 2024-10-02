<template>
  <div class="registration-container">
    <div class="container">
      <h2 class="text-center">Student Registration</h2>
      <form @submit.prevent="register">
        <div class="row mb-3">
          <label for="name" class="form-label col-12 col-md-4">Name:</label>
          <div class="col-12 col-md-8">
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="email" class="form-label col-12 col-md-4">Email:</label>
          <div class="col-12 col-md-8">
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="phone" class="form-label col-12 col-md-4">Phone Number:</label>
          <div class="col-12 col-md-8">
            <input
              type="tel"
              id="phone"
              v-model="phone"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="cv" class="form-label col-12 col-md-4">Upload CV:</label>
          <div class="col-12 col-md-8">
            <input
              type="file"
              id="cv"
              @change="handleFileUpload"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const phone = ref('');
const selectedFile = ref(null);
const router = useRouter();

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]; // Capture the file
};

const register = async () => {
  // Validate inputs
  const namePattern = /^[A-Za-z]+\s[A-Za-z]+$/; 
  const phonePattern = /^\d{8,12}$/; 

  if (!namePattern.test(name.value)) {
    alert('Please enter a valid first and last name.');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email.value)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!phonePattern.test(phone.value)) {
    alert('Phone number must be between 8 to 12 digits.');
    return;
  }

  if (!selectedFile.value) {
    alert('Please upload a CV.');
    return;
  }

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('phone', phone.value);
  formData.append('attachment', selectedFile.value); 

  try {
    const response = await axios.post('https://ecbb-103-31-104-208.ngrok-free.app/api/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    if (response.status === 200) {
      alert('Registration successful!'); 
      router.push('/'); 
    } 
  } catch (error) {
    const errorResponse = error.response.data;
    if ("validator object" in errorResponse) {
      const validatorObject = errorResponse["validator object"];
      alert(Object.values(validatorObject));
    }
  }
};

</script>

<style scoped>
.registration-container {
  background-image: url('path_to_your_gif.gif'); 
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 600px;
  background-color: rgba(249, 249, 249, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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

@media (max-width: 425px) {
  .form-label {
    font-size: 0.9rem;
  }

  .btn {
    width: 100%;
  }

  .row {
    margin-bottom: 15px;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .form-label {
    font-size: 1rem;
  }
}
</style>
