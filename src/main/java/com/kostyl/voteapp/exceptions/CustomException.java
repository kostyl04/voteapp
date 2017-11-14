package com.kostyl.voteapp.exceptions;

import org.springframework.http.HttpStatus;

public class CustomException extends RuntimeException {
	private HttpStatus status;

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public CustomException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}
}
