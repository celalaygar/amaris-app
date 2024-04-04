package com.project.amaris.error.controller;


import com.project.amaris.auth.api.LoginApi;
import com.project.amaris.error.dto.ApiErrorDto;
import com.project.amaris.error.dto.ExceptionDetailDto;
import com.project.amaris.error.exception.HttpErrorType;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@ControllerAdvice
public class BaseExceptionController implements ErrorController {

    private static Logger log = LoggerFactory.getLogger(LoginApi.class);

    @Autowired
    private ErrorAttributes errorAttributes;

    @Autowired
    private ModelMapper mapper;



    @RequestMapping("/error")
    ApiErrorDto handleError(WebRequest webRequest) {
        ErrorAttributeOptions options = ErrorAttributeOptions.defaults().including(ErrorAttributeOptions.Include.values());
        Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest, options);
        String message	= (String) attributes.get("message");
        String path 	= (String) attributes.get("path");
        String error 	= (String) attributes.get("error");
        int status		= (Integer) attributes.get("status");
        Date timestamp 	= (Date) attributes.get("timestamp");
        String exception 	= (String) attributes.get("exception");
        ApiErrorDto apiError = new ApiErrorDto(status, message, path, error);
        apiError.setHttpErrorType(HttpErrorType.STANDART);
        apiError.setCreatedDate(timestamp);
        ExceptionDetailDto detail = new ExceptionDetailDto(status, message, exception, null);
        apiError.setDetail(detail);
        if(attributes.containsKey("errors")) {
            @SuppressWarnings("unchecked")
            List<FieldError> fieldErrors = (List<FieldError>)attributes.get("errors");
            Map<String, String> validationErrors = new HashMap<>();
            if (fieldErrors.size()>0){
                apiError.setHttpErrorType(HttpErrorType.VALIDATION);
            }
            for(FieldError fieldError: fieldErrors) {
                validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            apiError.setValidationErrors(validationErrors);
        }
        return apiError;
    }

}
