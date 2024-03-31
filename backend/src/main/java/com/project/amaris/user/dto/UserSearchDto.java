package com.project.amaris.user.dto;

import com.project.amaris.user.entity.Role;
import lombok.Data;

import java.util.Date;

@Data
public class UserSearchDto {

    private Long userId;
    private String name;
    private String surname;
    private String fullname;
    private Date bornDate;
    private String username;
    private String password;
    private String email;
    private String tcNo;

    private Role role;
}
