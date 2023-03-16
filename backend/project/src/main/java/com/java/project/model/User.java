package com.java.project.model;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

        public String generateCommonLangPassword() {
            String upperCaseLetters = RandomStringUtils.random(2, 65, 90, true, true);
            String lowerCaseLetters = RandomStringUtils.random(2, 97, 122, true, true);
            String numbers = RandomStringUtils.randomNumeric(2);
            String specialChar = RandomStringUtils.random(2, 33, 47, false, false);
            String totalChars = RandomStringUtils.randomAlphanumeric(2);
            String combinedChars = upperCaseLetters.concat(lowerCaseLetters)
                    .concat(numbers)
                    .concat(specialChar)
                    .concat(totalChars);
            List<Character> pwdChars = combinedChars.chars()
                    .mapToObj(c -> (char) c)
                    .collect(Collectors.toList());
            Collections.shuffle(pwdChars);
            String password = pwdChars.stream()
                    .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                    .toString();
            return password;
        }
}