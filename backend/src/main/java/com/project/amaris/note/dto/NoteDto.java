package com.project.amaris.note.dto;

import com.project.amaris.note.entity.Note;
import com.project.amaris.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Data
public class NoteDto implements Serializable {


    private Long noteId;
    private String note;
    private User user;

    public NoteDto(Long noteId, String note, User user) {
        this.noteId = noteId;
        this.note = note;
        this.user = user;
    }
    public NoteDto(Note note) {
        this.noteId = note.getNoteId();
        this.note = note.getNote();
        this.user = note.getUser();
    }
}
