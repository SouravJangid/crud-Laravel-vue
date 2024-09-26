<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Students</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

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
                    <button type="button" class="btn btn-primary" @click="updateStudent">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import axios from 'axios';
export default {
    name: 'studentEdit',
    data() {
        return {
            studentId: '',
            errorList: [],
            model: {
                student: {
                    name: '',
                    course: '',
                    email: '',
                    phone: ''
                }
            }
        }
    },
    mounted() {
        this.studentId = this.$route.params.id;
        this.getStudentData(this.$route.params.id);

    },
    methods: {

        getStudentData(studentId) {
            axios
            .get(`http://127.0.0.1:8000/api/students/${studentId}/edit`)
            .then(res => {
                   this.model.student = res.data.student;
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 404) {
                            alert(error.response.data.errors);
                        }
                    }
                });
        },
        updateStudent() {
            var mythis = this;
            axios.put(`http://127.0.0.1:8000/api/students/${this.studentId}/edit`, this.model.student)
                .then(res => {
                    alert(res.data.message);
                    
                    this.errorList = [];
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 422) {
                            mythis.errorList = error.response.data.errors;
                        }
                        if (error.response.status == 404) {
                            alert(error.response.data.message);
                        }
                    } else if (error.request) {
                        console.log("Request failed", error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                });
        }
    }
}

</script>