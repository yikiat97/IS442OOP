package com.java.project.service;

import com.java.project.model.User;
import com.java.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository UserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public String encryptPassword(String password){
        return passwordEncoder.encode(password);
    }

    public boolean passwordCheck(String entryPassword, String savedPassword){
        return passwordEncoder.matches(entryPassword, savedPassword);
    }

    public boolean checkEmailExists(String email){
        User user = UserRepository.findUserByEmail(email);
        if (user == null){
            return false;
        }
        return true;
    }
}
