package com.java.project.model;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Document("User")
public class User{
        @Id
        private String email;
        private String password;
        private String name;
        private String contactNumber;
        private String role;
        private String companyRegistrationNum;
        private String userName;
        private Boolean deleted = false;

        public User(){

        }

        public User(String password, String name, String email, String contactNumber, String role, String companyRegistrationNum) {
            this.password = password;
            this.name = name;
            this.email = email;
            this.contactNumber = contactNumber;
            this.role = role;
            this.companyRegistrationNum = companyRegistrationNum;
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
        public String getContactNumber() {
            return contactNumber;
        }

        public void setContactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getCompanyRegistrationNum() {
            return companyRegistrationNum;
        }

        public void setCompany(String companyRegistrationNum) { this.companyRegistrationNum = companyRegistrationNum; }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String email, String role) {
            this.userName = role + "_" + email;
        }

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

    public void setCompanyRegistrationNum(String companyRegistrationNum) {
        this.companyRegistrationNum = companyRegistrationNum;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}