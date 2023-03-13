package com.java.project.controller;

import com.java.project.model.Admin;
import com.java.project.model.Approver;
import com.java.project.model.User;
import com.java.project.model.Vendor;
import com.java.project.repository.ApproverRepository;
import com.java.project.repository.UserRepository;
import com.java.project.repository.AdminRepository;
import com.java.project.repository.VendorRepository;
import com.java.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    UserRepository UserRepository;

    @Autowired
    AdminRepository AdminRepository;

    @Autowired
    ApproverRepository ApproverRepository;

    @Autowired
    VendorRepository VendorRepository;

    @Autowired
    UserService userService;

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
    public ResponseEntity createVendor(@RequestBody User newUser) {
        User user = userService.createUser(newUser);
        return ResponseEntity.ok(user);
    }

    @PostMapping(value = "/createAdmin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createAdmin(@RequestBody Admin newAdmin) {
        Admin admin = AdminRepository.save(newAdmin);
        return ResponseEntity.ok(admin);
    }

    @PostMapping(value = "/createApprover", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createApprover(@RequestBody Approver newApprover) {
        Approver approver = ApproverRepository.save(newApprover);
        return ResponseEntity.ok(approver);
    }

    @PostMapping(value = "/createVendor", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createVendor(@RequestBody Vendor newVendor) {
        Vendor vendor = VendorRepository.save(newVendor);
        return ResponseEntity.ok(vendor);
    }
}
