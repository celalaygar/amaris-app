package com.project.amaris.note.repository;

import com.project.amaris.note.entity.Note;
import com.project.amaris.user.entity.Role;
import com.project.amaris.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Page<Note> findAll(Pageable pageable);
}

