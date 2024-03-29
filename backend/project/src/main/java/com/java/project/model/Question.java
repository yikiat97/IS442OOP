package com.java.project.model;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;

public class Question {
    @Id
    private String questionID;
    private List<Map<String, Object>> QuestionData;
    private String Comments;
    private String Status;
    

    public String getQuestionID() {
        return questionID;
    }

    public void setQuestionID(String questionID) {
        this.questionID = questionID;
    }


    public void setComments(String Comments) {
        this.Comments = Comments;
    }

    public String getComments() {
        return Comments;
    }

    public void setStatus(String Status) {
        this.Status = Status;
    }

    public String getStatus() {
        return Status;
    }



    public List<Map<String, Object>> getQuestionData() {
        return QuestionData;
    }


    public void setQuestionData(List<Map<String, Object>> questionData) {
        QuestionData = questionData;
    }


    public Question( String questionID,List<Map<String, Object>> QuestionData , String Comments, String Status){
        //super();
        this.questionID = questionID;
        this.QuestionData = QuestionData;
        this.Comments = Comments;
        this.Status = Status;
        
        
    }



}

// [
//   {
//     "type": "header",
//     "subtype": "h2",
//     "label": "FORM NAME 1",
//     "className": "classname",
//     "access": false,
//     "role": "Test1"
//   },
//   {
//     "type": "paragraph",
//     "subtype": "p",
//     "label": "Psmthdjiadjoiadwqaragraph",
//     "className": "classname",
//     "access": true,
//     "role": "Test"
//   },
//   {
//     "type": "radio-group",
//     "required": false,
//     "label": "Radio Group",
//     "inline": false,
//     "name": "radio-group-1678370813611-0",
//     "access": false,
//     "other": false,
//     "values": [
//       {
//         "label": "Option 1",
//         "value": "option-1",
//         "selected": false
//       },
//       {
//         "label": "Option 2",
//         "value": "option-2",
//         "selected": false
//       },
//       {
//         "label": "Option 3",
//         "value": "option-3",
//         "selected": false
//       }
//     ]
//   },
//   {
//     "type": "text",
//     "required": false,
//     "label": "Write your name here",
//     "description": "nil",
//     "placeholder": "Write",
//     "className": "form-control",
//     "name": "name",
//     "access": true,
//     "subtype": "text",
//     "maxlength": 100,
//     "role": "Test"
//   },
//   {
//     "type": "textarea",
//     "required": false,
//     "label": "Text Area",
//     "className": "form-control",
//     "name": "textarea-1678370824590-0",
//     "access": false,
//     "subtype": "textarea"
//   },
//   {
//     "type": "signature",
//     "required": false,
//     "label": "Signature",
//     "name": "signature-1678371026995-0",
//     "access": false
//   }
// ]