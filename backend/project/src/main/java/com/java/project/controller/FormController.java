package com.java.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.project.exception.DataNotFoundException;
import com.java.project.exception.GlobalExceptionHandler;
import com.java.project.model.Form;
import com.java.project.repository.FormRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class FormController {
  @Autowired
  FormRepository FormRepository;

  @Autowired
  private GlobalExceptionHandler globalExceptionHandler;

  // Insert new question
  @PostMapping("Form/insertForm")
  public ResponseEntity<?> createQuestion(@RequestBody Form FormData) {
    try {
      FormRepository.save(FormData);
      // System.out.println(FormData.getQuestionID());
      System.out.println("========= INSERT DATA SUCCESSFUL ===========");
      return new ResponseEntity<>(FormData, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>("Please contact system administrator", HttpStatus.BAD_REQUEST);
    }
  }

  // ================================== Json Structure for Below
  // ===================================
  // http://localhost:8080/Form/insertForm
  // {
  // "WorkflowID":"123444kko",
  // "FormType":"A",
  // "FormName":"Safety Pre-Check Form 2",
  // "QuestionData": [
  // {
  // "type": "header",
  // "subtype": "h2",
  // "label": "FORM NAME 1",
  // "className": "classname",
  // "access": false,
  // "role": "Test1"
  // },
  // {
  // "type": "paragraph",
  // "subtype": "p",
  // "label": "Psmthdjiadjoiadwqaragraph",
  // "className": "classname",
  // "access": true,
  // "role": "Test"
  // }
  // ]
  // }

  // Get All Form
  @GetMapping("getForm/All")
  public List<Form> getAllQuestion() {
    return FormRepository.findAll();
  }
  // http://localhost:8080/getForm/640b618edb086d54e974b3b4//

  // Get Form by ID
  @GetMapping("getForm/{id}")
  public ResponseEntity<?> getFormById(@PathVariable("id") String id) {
    Optional<Form> Form = FormRepository.findById(id);
    if (Form.isPresent()) {
      System.out.println("========= GET DATA SUCCESSFUL ===========");
      return ResponseEntity.ok(Form.get());

    } else {
      System.out.println("========= GET DATA FAILED ===========");
      throw new DataNotFoundException("Form Not Found");
    }
  }
  // http://localhost:8080/getQuestion/{id}

  // Get Form by ID
  // Delete Form by ID
  // Delete Form by ID
  @DeleteMapping("hardDeleteForm/{id}")
  public ResponseEntity<?> hardDeleteFormById(@PathVariable("id") String id) {
    Optional<Form> Form = FormRepository.findById(id);
    if (Form.isPresent()) {
      FormRepository.deleteById(id);
      System.out.println("========= DELETE DATA SUCCESSFUL ===========");

      Map<String, String> response = new HashMap<>();
      response.put("status", "success");
      response.put("message", "Form deleted successfully");

      return ResponseEntity.status(HttpStatus.OK).body(response);
    } else {
      System.out.println("========= DELETE DATA FAILED ===========");

      Map<String, String> response = new HashMap<>();
      response.put("status", "error");
      response.put("message", "Form not found");

      throw new DataNotFoundException("Form Not Found");
    }
  }
  // http://localhost:8080/deleteForm/{id}

  // Get Form by ID
  // Delete Form by ID
  // Delete Form by ID
  @PutMapping("softDeleteForm/{id}")
  public ResponseEntity<?> softDeleteFormById(@PathVariable("id") String id) {
    Optional<Form> Form = FormRepository.findById(id);
    if (Form.isPresent()) {
      Form updatedForm = FormRepository.save(new Form(id, Form.get().getWorkflowID(), Form.get().getFormType(),
          Form.get().getFormName(), Form.get().getQuestionData(), "Deleted"));
      // System.out.println("========= DELETE DATA SUCCESSFUL ===========");

      Map<String, String> response = new HashMap<>();
      response.put("status", "success");
      response.put("message", "Form deleted successfully");

      return ResponseEntity.status(HttpStatus.OK).body(response);
    } else {
      System.out.println("========= DELETE DATA FAILED ===========");

      Map<String, String> response = new HashMap<>();
      response.put("status", "error");
      response.put("message", "Form not found");

      throw new DataNotFoundException("Form Not Found");
    }
  }
  // http://localhost:8080/deleteForm/{id}




@PutMapping("restoreForm/{id}")
public ResponseEntity<?> restoreFormById(@PathVariable("id") String id) {
  Optional<Form> form = FormRepository.findById(id);
  if (form.isPresent()) {
    Form updatedForm = FormRepository.save(new Form(id, form.get().getWorkflowID(), form.get().getFormType(),
        form.get().getFormName(), form.get().getQuestionData(), "Not Deleted"));

    Map<String, String> response = new HashMap<>();
    response.put("status", "success");
    response.put("message", "Form restored successfully");

    return ResponseEntity.status(HttpStatus.OK).body(response);
  } else {
    Map<String, String> response = new HashMap<>();
    response.put("status", "error");
    response.put("message", "Form not found");

    throw new DataNotFoundException("Form Not Found");
  }
}

}
