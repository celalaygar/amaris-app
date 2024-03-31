package com.project.amaris.error.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExceptionDetailDto {


    private int status;
    private String message;
    private String exceptionDetail;
    private String trace;
}
