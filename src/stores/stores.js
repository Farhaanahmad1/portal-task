import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    adminEmail: 'admin@example.com', 
    adminPassword: 'admin123', 
  }),
  actions: {
    validateAdmin(email, password) {
      return this.adminEmail === email && this.adminPassword === password;
    },
  },
});

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [], // Holds all students' data
    loading: false, // For handling loading state
    error: null,    // For handling errors
  }),
  actions: {
    // Fetch students from API (adjust the URL as necessary)
    async fetchStudents() {
      this.loading = true;
      try {
        const response = await axios.get('https://your-api-url.com/students'); // Replace with your actual API endpoint
        this.students = response.data.students; // Adjust based on your API response structure
      } catch (error) {
        this.error = 'Failed to fetch students';
      } finally {
        this.loading = false;
      }
    },

    // Accept student
    async acceptStudent(studentId, studentEmail, studentName) {
      this.loading = true;
      try {
        const response = await axios.post(
          'https://a949-103-31-104-208.ngrok-free.app/api/accept-application',
          { id: studentId }  // Pass the student ID to the API
        );

        if (response.status === 200) {
          // Notify about success, possibly trigger email logic here if required
          alert(`Student ${studentName} accepted! Email sent to ${studentEmail}`);
          // Remove the student from the list after acceptance
          this.students = this.students.filter(student => student.id !== studentId);
        } else {
          alert('Failed to accept the student. Please try again.');
        }
      } catch (error) {
        this.error = 'Failed to accept student';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
