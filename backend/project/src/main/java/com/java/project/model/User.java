package com.java.project.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
public class User{
        private String password;
        private String name;
        private String email;
        private String role;
        private String company;
        private String userName;

        public User(){

        }
        
        public User(String password, String name, String email, String role, String company) {
            this.password = password;
            this.name = name;
            this.email = email;
            this.role = role;
            this.company = company;
            this.userName = role + "_" + email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) { this.company = company; }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) { this.userName = userName; }
}