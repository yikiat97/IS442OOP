package com.java.project.controller;

import com.java.project.model.User;
import com.java.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    UserRepository UserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@RequestBody User userDetails) {
        User user = UserRepository.findUserByEmail(userDetails.getEmail());
        if (user == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.UNAUTHORIZED);
        }
        if (!user.getPassword().equals(userDetails.getPassword())) {
            return new ResponseEntity<>("Password does not match", HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(user.getRole());
    }

    @PostMapping(value = "/createUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createUser(@RequestBody User newUser) {
        String encodedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);
        User user = UserRepository.save(newUser);
        return ResponseEntity.ok(user);
    }


}
