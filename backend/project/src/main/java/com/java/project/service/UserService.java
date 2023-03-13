package com.java.project.service;

import com.java.project.model.User;
import com.java.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository UserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<String> getCompanies(){
        List<String> companyList = new ArrayList<>();
        List<User> userList = UserRepository.findAll();

        for(int i=0; i < userList.size(); i++){
            if(!companyList.contains(userList.get(i).getCompany())){
                companyList.add(userList.get(i).getCompany());
            }
        }
        return companyList;
    }

    public List<User> getUsersCompany(String companyName){
        List<User> userList = UserRepository.findByCompany(companyName);
        return userList;
    }

    public User createUser(User user){
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        User newUser = new User(encodedPassword, user.getName(), user.getEmail(), user.getRole(), user.getCompany());
        User userCreated = UserRepository.save(newUser);
        return userCreated;
    }
}
