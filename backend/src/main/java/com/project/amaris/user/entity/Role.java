package com.project.amaris.user.entity;

public enum Role {
    ADMIN("ADMIN"),
    MANAGER("MÜDÜR");


    private String value;
    public String getValue() {
        return this.value;
    }
    Role(String value) {
        this.value = value;
    }

}
