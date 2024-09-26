<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Students</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="model.student.name" required>
                </div>
                <div class="mb-3">
                    <label for="course" class="form-label">Course</label>
                    <input type="text" class="form-control" id="course" v-model="model.student.course" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email" v-model="model.student.email" required>
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" id="phone" v-model="model.student.phone" required>
                </div>
                <div class="mb-3">
                    <button type="button" class="btn btn-primary" @click="saveStudent">Save</button>
                </div>
                <ul class="alert alert-warning" v-if="Object.keys(model.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in model.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'studentsCreate',
    data() {
        return {
            model: {
                student: {
                    name: '',
                    course: '',
                    email: '',
                    phone: ''
                },
                errorList: [] // Moved `errorList` inside `model` object
            }
        };
    },
    methods: {
        saveStudent() {
            axios.post('http://127.0.0.1:8000/api/students', this.model.student)
                .then(res => {
                    alert(res.data.message);
                    this.model.student = {
                        name: '',
                        course: '',
                        email: '',
                        phone: ''
                    };
                    this.model.errorList = []; // Reset error list after successful submission
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 422) {
                            this.model.errorList = error.response.data.errors; // Assign errors to `model.errorList`
                        }
                    } else if (error.request) {
                        console.log("Request failed", error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                });
        }
    }
};
</script>
