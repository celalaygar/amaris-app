package com.project.amaris.user.dto;

import com.project.amaris.user.entity.Role;
import com.project.amaris.user.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@Data
public class UserDto {
    private Long userId;
    private String name;
    private String surname;
	private Date bornDate;
	private Date createdDate;
    private String username;
    @NotNull
    private String email;
    private Role role;
    @NotNull
    private String tcNo;
    @NotNull
    private String motherName;
    @NotNull
    private String fatherName;
    private String password;
    private String bloodType;
    private String phoneNumber;

    private int isLoggedIn;
    private int status;

    public UserDto(){

    }
    public UserDto(User user){
        this.userId = user.getUserId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.bornDate = user.getBornDate();
        this.createdDate = user.getBornDate();
        this.username = user.getUsername();
        this.role = user.getRole();
        this.tcNo = user.getTcNo();
        this.motherName = user.getMotherName();
        this.fatherName = user.getFatherName();
        this.email = user.getEmail();
        this.bloodType = user.getBloodType();
        this.phoneNumber = user.getPhoneNumber();
        this.isLoggedIn = user.getIsLoggedIn();
        this.status = user.getStatus();
    }
}
