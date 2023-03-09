package com.java.project.controller;

import com.java.project.model.User;
import com.java.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    UserRepository UserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/role")
    public ResponseEntity getUser(@RequestParam("email") String email, @RequestParam("password") String password){
        User user = UserRepository.findUserByEmail(email);
        if(user == null){
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);

        }else{
            if(passwordEncoder.matches(password, user.getPassword())){
                return ResponseEntity.ok(user.getRole());
            }else{
                return new ResponseEntity<>("Wrong password", HttpStatus.NOT_FOUND);
            }
        }

    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, value = "/createUser")
    public ResponseEntity createUser(@RequestBody User newUser) {
        String encodedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);
        User user = UserRepository.save(newUser);
        return ResponseEntity.ok(user);
    }


}
