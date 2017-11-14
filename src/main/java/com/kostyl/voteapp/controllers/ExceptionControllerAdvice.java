package com.kostyl.voteapp.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.kostyl.voteapp.exceptions.CustomException;

@ControllerAdvice
public class ExceptionControllerAdvice {
	@ExceptionHandler({ CustomException.class })
    public ResponseEntity<Object> handleCustomException(CustomException ex, WebRequest request) {
        return new ResponseEntity<Object>(
        		ex.getMessage(), new HttpHeaders(), ex.getStatus());
    }
}
