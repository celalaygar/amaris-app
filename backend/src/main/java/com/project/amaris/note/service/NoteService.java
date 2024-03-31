package com.project.amaris.note.service;

import com.project.amaris.note.dto.NoteDto;
import com.project.amaris.note.entity.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NoteService {


    public List<Note> findAll();
    public Page<NoteDto> search(Pageable page) throws Exception;
    public Boolean save(Note note) throws Exception;
    public NoteDto findById(Note note) throws Exception;
    public Boolean update(Note note) throws Exception;
    public Boolean delete(Note note) throws Exception;
}
