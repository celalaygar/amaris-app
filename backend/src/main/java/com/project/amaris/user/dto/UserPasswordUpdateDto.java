package com.project.amaris.user.dto;

import lombok.Data;

@Data
public class UserPasswordUpdateDto {
    private String oldPassword;
    private String newPassword;
    private String repeatNewPassword;
}
