package com.java.project.controller;

import com.java.project.model.Admin;
import com.java.project.model.Approver;
import com.java.project.model.User;
import com.java.project.model.Vendor;
import com.java.project.repository.UserRepository;
import com.java.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/login")
public class UserController {

    @Autowired
    UserRepository UserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@RequestBody User userDetails) {
        User user = UserRepository.findUserByEmail(userDetails.getEmail());
        if (user == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.UNAUTHORIZED);
        }
        if (!passwordEncoder.matches(userDetails.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Password does not match", HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(user.getRole());
    }

    @PostMapping(value = "/createAdmin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createAdmin(@RequestBody Admin newAdmin) {
        if(!userService.checkEmailExists(newAdmin.getEmail())){
            String encodedPassword = userService.encryptPassword(newAdmin.getPassword());
            newAdmin.setPassword(encodedPassword);
            Admin admin = UserRepository.save(newAdmin);
            return ResponseEntity.ok(admin);
        }
        else{
            return new ResponseEntity<>("User already exists", HttpStatus.UNAUTHORIZED);
        }

    }

    @PostMapping(value = "/createApprover", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createApprover(@RequestBody Approver newApprover) {
        if(!userService.checkEmailExists(newApprover.getEmail())) {
            String encodedPassword = userService.encryptPassword(newApprover.getPassword());
            newApprover.setPassword(encodedPassword);
            Approver approver = UserRepository.save(newApprover);
            return ResponseEntity.ok(approver);
        }else{
            return new ResponseEntity<>("User already exists", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/createVendor", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createVendor(@RequestBody Vendor newVendor) {
        if(!userService.checkEmailExists(newVendor.getEmail())) {
            String encodedPassword = userService.encryptPassword(newVendor.getPassword());
            newVendor.setPassword(encodedPassword);
            Vendor vendor = UserRepository.save(newVendor);
            return ResponseEntity.ok(vendor);
        }else{
            return new ResponseEntity<>("User already exists", HttpStatus.UNAUTHORIZED);
        }
    }
}
