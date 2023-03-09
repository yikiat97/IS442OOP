package com.java.project.controller;

import com.java.project.model.User;
import com.java.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    UserRepository UserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@RequestBody User userDetails) {
        System.out.println(userDetails.getPassword());
        System.out.println(userDetails.getEmail());

        User user = UserRepository.findUserByEmail(userDetails.getEmail());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User does not exist");
        }
        if (!user.getPassword().equals(userDetails.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password does not match");
        }

        return ResponseEntity.ok(user.getRole());
    }

    @GetMapping("/role")
    public ResponseEntity getRole(@RequestParam("email") String email, @RequestParam("password") String password) {
        User user = UserRepository.findUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);

        } else {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.ok(user.getRole());
            } else {
                return new ResponseEntity<>("Wrong password", HttpStatus.NOT_FOUND);
            }
        }

    }

    @PostMapping(value = "/createUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createUser(@RequestBody User newUser) {
        String encodedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);
        User user = UserRepository.save(newUser);
        return ResponseEntity.ok(user);
    }


}
