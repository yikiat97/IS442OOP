package com.java.project.controller;

import com.java.project.model.*;
import com.java.project.repository.CompanyRepository;
import com.java.project.repository.EmailRepository;
import com.java.project.repository.UserRepository;
import com.java.project.service.EmailSenderService;
import com.java.project.service.UserService;
import jakarta.mail.MessagingException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/login")
public class UserController {

    @Autowired
    UserRepository UserRepository;

    @Autowired
    EmailSenderService EmailService;

    @Autowired
    UserService userService;

    @Autowired
    CompanyRepository CompanyRepository;

    @Autowired
    EmailRepository EmailRepository;

    @GetMapping("/getEmails")
    public ResponseEntity getEmails(){
        List<User> userList = UserRepository.findAll();
        List<String> emailList = new ArrayList<>();
        for (User user: userList
             ) {
            emailList.add(user.getEmail());
        }
        if(userList != null){
            return ResponseEntity.ok(emailList);
        }else{
            return new ResponseEntity<>("Something went wrong", HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/getUser")
    public ResponseEntity getUserByEmail(@RequestParam String email){
        User user = UserRepository.findUserByEmail(email);
        if(user!=null){
            List<String> userInfoList = new ArrayList<>();
            userInfoList.add(user.getName());
            userInfoList.add(user.getContactNumber());
            userInfoList.add(user.getRole());
            userInfoList.add(user.getCompanyRegistrationNum());
            return ResponseEntity.ok(userInfoList);
        }else {
            return new ResponseEntity<>("User does not exist", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getUsersByCompany")
    public ResponseEntity getUserByCompany(@RequestParam String registrationNum){
        List<User> userList = UserRepository.findUserByCompanyRegistrationNum(registrationNum);

        if(userList!=null){
            return ResponseEntity.ok(userList);
        }else {
            return new ResponseEntity<>("No user under the company", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@RequestBody User userDetails) {
        User user = UserRepository.findUserByEmail(userDetails.getEmail());
        if (user == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.UNAUTHORIZED);
        }
        if (!userService.passwordCheck(userDetails.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Password does not match", HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(user.getRole());
    }

    @PostMapping(value = "/createAdmin", consumes = "application/json", produces = "application/json")
    public ResponseEntity createAdmin(@RequestBody Admin newAdmin) {
        if(!userService.checkEmailExists(newAdmin.getEmail())){
            String rawPassword = newAdmin.generateCommonLangPassword();
            String encodedPassword = userService.encryptPassword(rawPassword);
            newAdmin.setPassword(encodedPassword);
            newAdmin.setUserName(newAdmin.getEmail(), newAdmin.getRole());
            Admin admin = UserRepository.save(newAdmin);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
            Email email = new Email(admin.getEmail(),"Hidden","Account created for Quantum VMS","");
            try{
                EmailService.sendEmail(admin.getEmail(),emailBody,"Account created for Quantum VMS","");
                email.setStatus("success");
                Email emailSent = EmailRepository.save(email);
                return ResponseEntity.ok(admin);
            }catch (MailException e){
                email.setStatus("error");
                Email emailSent = EmailRepository.save(email);
                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
            }catch(MessagingException e) {
                email.setStatus("error");
                Email emailSent = EmailRepository.save(email);
                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }

    }

    @PostMapping(value = "/createApprover", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createApprover(@RequestBody Approver newApprover) {
        if(!userService.checkEmailExists(newApprover.getEmail())) {
            String rawPassword = newApprover.generateCommonLangPassword();
            String encodedPassword = userService.encryptPassword(rawPassword);
            newApprover.setPassword(encodedPassword);
            newApprover.setUserName(newApprover.getEmail(), newApprover.getRole());
            Approver approver = UserRepository.save(newApprover);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
            Email email = new Email(approver.getEmail(),"Hidden","Account created for Quantum VMS","");
            try{
                EmailService.sendEmail(approver.getEmail(),emailBody,"Account created for Quantum VMS","");
                email.setStatus("success");
                Email emailSent = EmailRepository.save(email);
                return ResponseEntity.ok(approver);
            }catch (MailException e){
                email.setStatus("error");
                Email emailSent = EmailRepository.save(email);
                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
            }catch(MessagingException e) {
                email.setStatus("error");
                Email emailSent = EmailRepository.save(email);
                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
            }
        }else{
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }
    }

    @PostMapping(value = "/createVendor", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createVendor(@RequestBody Vendor newVendor) {
        if(!userService.checkEmailExists(newVendor.getEmail())) {
            String rawPassword = newVendor.generateCommonLangPassword();
            String encodedPassword = userService.encryptPassword(rawPassword);
            newVendor.setPassword(encodedPassword);
            newVendor.setUserName(newVendor.getEmail(), newVendor.getRole());
            Vendor vendor = UserRepository.save(newVendor);

            String emailBody = "An account has been created for you. Your password is: "+ rawPassword;
            Email email = new Email(vendor.getEmail(),"Hidden","Account created for Quantum VMS","");
            try{
                EmailService.sendEmail(vendor.getEmail(),emailBody,"Account created for Quantum VMS","");
                email.setStatus("success");
                Email emailSent = EmailRepository.save(email);
                return ResponseEntity.ok(vendor);
            }catch (MailException e){
                email.setStatus("error");
                Email emailSent = EmailRepository.save(email);
                return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
            }catch(MessagingException e) {
                email.setStatus("error");
                Email emailSent = EmailRepository.save(email);
                return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
            }
        }else{
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/numUsers")
    public ResponseEntity numUsers(){
        JSONObject userCount = new JSONObject();
        int vendorCount = UserRepository.findByRole("Vendor").size();
        int adminCount = UserRepository.findByRole("Admin").size();
        int approverCount = UserRepository.findByRole("Approver").size();
        userCount.put("Vendor", vendorCount);
        userCount.put("Admin", adminCount);
        userCount.put("Approver", approverCount);
        return ResponseEntity.ok(userCount);
    }

    @PostMapping(value = "/forgetPassword")
    public ResponseEntity forgetPassword(@RequestParam String email){
        User user = UserRepository.findUserByEmail(email);

        String rawPassword = user.generateCommonLangPassword();
        String encodedPassword = userService.encryptPassword(rawPassword);
        user.setPassword(encodedPassword);
        UserRepository.deleteByEmail(email);

        User userSaved = UserRepository.save(user);
        String emailBody = "You have requested to change your password. Your new password is: "+ rawPassword;
        try{
            EmailService.sendEmail(userSaved.getEmail(),emailBody,"Change password for Quantum VMS","");
            return ResponseEntity.ok(userSaved);
        }catch (MailException e){
            return new ResponseEntity<>("Mail Exception error", HttpStatus.UNAUTHORIZED);
        }catch(MessagingException e){
            return new ResponseEntity<>("Messaging Exception error", HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping(value = "/changePassword")
    public ResponseEntity changePassword(@RequestParam String email, @RequestParam String oldPassword, @RequestParam String newPassword){
        User user = UserRepository.findUserByEmail(email);
        if(user!=null){
            if(userService.passwordCheck(oldPassword, user.getPassword())){
                String encodedPassword = userService.encryptPassword(newPassword);
                user.setPassword(encodedPassword);
                User savedUser = UserRepository.save(user);
                return ResponseEntity.ok(savedUser);
            }else{
                return new ResponseEntity<>("Old password is wrong", HttpStatus.UNAUTHORIZED);
            }
        }
        return new ResponseEntity<>("No such email found", HttpStatus.UNAUTHORIZED);
    }

    @PutMapping(value = "/editUser")
    public ResponseEntity editUser(@RequestBody User editUser){
        Optional<User> user = UserRepository.findById(editUser.getEmail());
        if(user.isPresent()){
            String password = user.get().getPassword();
            editUser.setPassword(password);
            String role = editUser.getRole();

            //password, name, email, contactNumber, role, companyRegistrationNum

            if(role.equals("Admin")){
                Admin saveUser = new Admin(editUser.getPassword(), editUser.getName(), editUser.getEmail(),editUser.getContactNumber(), role, editUser.getCompanyRegistrationNum());
                User savedUser = UserRepository.save(saveUser);
                return ResponseEntity.ok(savedUser);
            } else if (role.equals("Approver")) {
                Approver saveUser = new Approver(editUser.getPassword(), editUser.getName(), editUser.getEmail(),editUser.getContactNumber(), role, editUser.getCompanyRegistrationNum());
                User savedUser = UserRepository.save(saveUser);
                return ResponseEntity.ok(savedUser);
            } else{
                Vendor saveUser = new Vendor(editUser.getPassword(), editUser.getName(), editUser.getEmail(),editUser.getContactNumber(), role, editUser.getCompanyRegistrationNum());
                User savedUser = UserRepository.save(saveUser);
                return ResponseEntity.ok(savedUser);
            }
        }
        return new ResponseEntity<>("No such email found", HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity deleteUser(@RequestParam String email){
        if(userService.checkEmailExists(email)){
            UserRepository.deleteByEmail(email);
            return ResponseEntity.ok("ok");
        }else{
            return new ResponseEntity<>("User does not exist", HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping(value = "/getVendors")
    public ResponseEntity getVendors(){
        HashMap<String, List> response = new HashMap<>();
        List<User> userList = UserRepository.findByRole("Vendor");
        for (User user:userList
        ) {
            Optional<Company> company = CompanyRepository.findById(user.getCompanyRegistrationNum());
            if(company.isPresent()){
                List infoList= new ArrayList<>();
                infoList.add(company);
                infoList.add(user);
                response.put(company.get().getName(), infoList);
            }
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getAdmins")
    public ResponseEntity getAdmins(){
        List<List> resultList = new ArrayList<>();
        List<User> vendorList = UserRepository.findByRole("Admin");
        Optional<Company> company = CompanyRepository.findById(vendorList.get(0).getCompanyRegistrationNum());
        if(company.isPresent()){
            List<Company> companyList = new ArrayList<>();
            companyList.add(company.get());
            resultList.add(companyList);
            resultList.add(vendorList);
            return ResponseEntity.ok(resultList);
        }else{
            return new ResponseEntity<>("Company does not exist", HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping("/getApprovers")
    public ResponseEntity getApprovers() {
        List<User> Vendors = UserRepository.findByRole("Approver");
        Map<String, List<User>> vendorMap = Vendors.stream().collect(Collectors.groupingBy(User::getCompanyRegistrationNum));
        return ResponseEntity.ok(vendorMap);
    }
}
