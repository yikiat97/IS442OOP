package com.java.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.project.exception.DataNotFoundException;
import com.java.project.exception.GlobalExceptionHandler;
import com.java.project.model.Question;
import com.java.project.repository.QuestionRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class QuestionController {
    
    @Autowired
    QuestionRepository QuestionRepository;    
    
    @Autowired
    private GlobalExceptionHandler globalExceptionHandler;    

    @GetMapping("Question/All")
    public List<Question> getAllQuestion() {
            if(QuestionRepository.findAll().isEmpty()){
              throw new DataNotFoundException("Questions not found");
            }
            else{
              return QuestionRepository.findAll();
            }
        }
    //  http://localhost:8080/Question/All
    
    
    
    
    // Get Question by ID
    @GetMapping("getQuestion/{id}")
    public ResponseEntity<?> getFormById(@PathVariable("id") String id) {
        Optional<Question> Question = QuestionRepository.findById(id);
        if (Question.isPresent()) {
          System.out.println("========= GET DATA SUCCESSFUL ===========");
            return ResponseEntity.ok(Question.get());
            
        } else {
          System.out.println("========= GET DATA FAILED ===========");
            throw new DataNotFoundException("Question not found");
        }
    }
    //http://localhost:8080/getQuestion/{id}
    

    // Insert new question
    @PostMapping("Question/insertQuestion")
    public ResponseEntity<Question> createQuestion(@RequestBody Question QuestionData) {

      QuestionRepository.save(QuestionData);
      System.out.println(QuestionData.getQuestionID());
      System.out.println("========= INSERT DATA SUCCESSFUL ===========");
        return new ResponseEntity<>(QuestionData, HttpStatus.CREATED);
      }
      //================================== Json Structure for above ===================================
      //http://localhost:8080/Question/insertQuestion
      // {
      //   "QuestionData": {
      //           "field1": "value1",
      //           "field2": 123,
      //           "field3": {
      //               "subfield1": "subvalue1",
      //               "subfield2": true
      //               }
      //   }}

      @PutMapping("/Question/updateQuestion/{id}")
      public ResponseEntity<Question> updateQuestionById(@PathVariable(value = "id") String questionId,
                                                    @RequestBody Question questionData) {
      Optional<Question> optionalQuestion = QuestionRepository.findById(questionId);

      if (optionalQuestion.isPresent()) {
          Question question = optionalQuestion.get();
          question.setQuestionData(questionData.getQuestionData());
          question.setComments(questionData.getComments());

          QuestionRepository.save(question);
          System.out.println("========= UPDATE DATA SUCCESSFUL ===========");
          return new ResponseEntity<>(question, HttpStatus.OK);
      } else {
          throw new DataNotFoundException("Question not found");
      }
}


    }
