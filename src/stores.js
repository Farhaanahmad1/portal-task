// src/stores.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    adminEmail: 'admin@example.com',
    adminPassword: 'admin123',
    students: [], 
    resetToken: null, 
    resetEmail: null, 
  }),
  actions: {
    validateAdmin(email, password) {
      return this.adminEmail === email && this.adminPassword === password;
    },
    addStudent(student) {
      this.students.push(student); 
    },
    setResetToken(token) {
      this.resetToken = token; 
    },
    setResetEmail(email) {
      this.resetEmail = email; 
    },
    clearResetInfo() {
      this.resetToken = null; 
      this.resetEmail = null; 
    },
  },
});
