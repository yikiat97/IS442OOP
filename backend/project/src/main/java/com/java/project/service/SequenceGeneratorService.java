package com.java.project.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.java.project.model.IDCounter;
import com.java.project.repository.IDCountersRepository;


@Service
public class SequenceGeneratorService {
    @Autowired
    IDCountersRepository idCountersRepository;

    public Integer generateSequence(String seqName) {
        Optional<IDCounter> idCounter = idCountersRepository.findById(seqName);
        int currSeq = idCounter.get().getSeq();
        String id = idCounter.get().getId();
        idCountersRepository.save(new IDCounter(id, currSeq+1));
        return currSeq+1;
    }
}
