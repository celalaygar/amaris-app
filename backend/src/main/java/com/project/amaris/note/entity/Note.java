package com.project.amaris.note.entity;

import com.project.amaris.user.entity.Role;
import com.project.amaris.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Data
@Getter
@Setter
@Entity
@Table(name="notes")
public class Note implements Serializable {

    @Id
    @SequenceGenerator(name = "sq_note", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_note")
    @Column(name = "note_id")
    private Long noteId;

    @Column(name = "name")
    @NotEmpty
    @NotNull
    private String note;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    @Column(name = "createdDate")
    private Date createdDate;
}
