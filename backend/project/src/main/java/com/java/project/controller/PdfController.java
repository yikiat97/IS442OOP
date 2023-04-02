package com.java.project.controller;

import com.java.project.exception.DataNotFoundException;
import com.java.project.model.Pdf;
import com.java.project.repository.PdfRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/pdf")
public class PdfController {

    @Autowired
    PdfRepository PdfRepository;

    @GetMapping
    public ResponseEntity getAll(){
        List<Pdf> pdfList = PdfRepository.findAll();
        return ResponseEntity.ok(pdfList);
    }

    @GetMapping("/getAvail/{workflowID}")
    public ResponseEntity getWorkflowAvailPdf(@PathVariable("workflowID") String workflowID){
        List<Pdf> pdfList = PdfRepository.findPdfByWorkflowForm(workflowID);

        if (pdfList.isEmpty()) {
            throw new DataNotFoundException("No PDFs found");
        } else {
            List<List> resultList = new ArrayList<>();
            for (Pdf pdf: pdfList
                 ) {
                List<String> currList = new ArrayList<>();
                currList.add(pdf.getWorkflowID());
                currList.add(pdf.getFormID());
                resultList.add(currList);
            }
            return ResponseEntity.ok(resultList);
        }
    }

    @GetMapping("/getPdf/{workflowID}")
    public void getPdfFromByte(@PathVariable("workflowID") String workflowID){
        List<Pdf> pdfList = PdfRepository.findPdfByWorkflowForm(workflowID);
        for(Pdf pdf:pdfList){
            try{
                FileOutputStream outputStream = new FileOutputStream(workflowID + "_"+ pdf.getFormID() +"_"+".pdf");
                outputStream.write(pdf.getPdfByte());
                outputStream.close();

                // Print confirmation message
                System.out.println("PDF file saved to: " + workflowID + "_"+ pdf.getFormID() +"_"+".pdf");
            }catch(IOException e){
                System.out.println(e);
            }
        }
    }

    @PostMapping("/saveReactPage/{formID}/{workflowID}")
    public ResponseEntity saveReactPage(@PathVariable("formID") String formID, @PathVariable("workflowID") String workflowID, @RequestBody String pageSource){
        try{
            Document document = Jsoup.parse(pageSource);
            document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
            File output = new File("current.pdf");
            ITextRenderer iTextRenderer = new ITextRenderer();
            iTextRenderer.setDocumentFromString(document.html());
            iTextRenderer.layout();
            OutputStream os = new FileOutputStream(output);
            iTextRenderer.createPDF(os);
            os.close();
        }catch (IOException e){
            System.out.println(e);
        }

        try{
            Path pdfPath = Paths.get("current.pdf");
            byte[] data = Files.readAllBytes(pdfPath);
            Pdf pdf = new Pdf(formID, workflowID, data);
            PdfRepository.save(pdf);
        }catch(FileNotFoundException e){
            System.out.println(e);
        }catch(IOException e){
            System.out.println(e);
        }

        return ResponseEntity.ok("ok");
    }

}
