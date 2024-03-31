package com.project.amaris.note.service;

import com.project.amaris.auth.service.ControlService;
import com.project.amaris.note.dto.NoteDto;
import com.project.amaris.note.entity.Note;
import com.project.amaris.note.repository.NoteRepository;
import com.project.amaris.user.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class NoteServiceImp implements NoteService {

    private Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private ControlService controlService;
    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    public Page<NoteDto> search(Pageable page) throws Exception {
        Page<Note> list = noteRepository.findAll(page);
        Page<NoteDto> pageList = list.map(NoteDto::new);
        log.error("NoteService.getAllWithPageNote Note saved");
        return pageList;
    }

    public Boolean save(Note note) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = controlService.getUser(authentication.getName());
        note.setUser(user);
        note.setCreatedDate(new Date());
        note = noteRepository.save(note);
        log.error("NoteService.save Note saved");
        return true;
    }
    public NoteDto findById(Note note) throws Exception {
        Optional<Note> opt = noteRepository.findById(note.getNoteId());
        if(!opt.isPresent()){
            log.error("NoteService.findById  Not found Note : " + note.getNoteId());
            throw new NullPointerException("Not found Note : " + note.getNoteId());
        }
        return new NoteDto(opt.get());
    }
    public Boolean update(Note note) throws Exception {
        Optional<Note> opt = noteRepository.findById(note.getNoteId());
        if(!opt.isPresent()){
            log.error("NoteService.update  Not found Note : " + note.getNoteId());
            throw new NullPointerException("Not found Note : " + note.getNoteId());
        }
        note = noteRepository.save(note);
        return true;
    }
    public Boolean delete(Note note) throws Exception {
        Optional<Note> opt = noteRepository.findById(note.getNoteId());
        if(!opt.isPresent()){
            log.error("NoteService.delete  Not found Note : " + note.getNoteId());
            throw new NullPointerException("Not found Note : " + note.getNoteId());
        }
        noteRepository.delete(note);
        return true;
    }
}
