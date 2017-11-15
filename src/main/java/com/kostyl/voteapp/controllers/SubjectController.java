package com.kostyl.voteapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.kostyl.voteapp.entity.Subject;
import com.kostyl.voteapp.services.SubjectService;

@RestController()
@RequestMapping("/api/subjects")
public class SubjectController {
	private SubjectService subjectService;

	@GetMapping(value = "/", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
			MediaType.APPLICATION_JSON_VALUE })
	public List<Subject> getAllSubjects() {
		return subjectService.getSubjects();
	}

	@PostMapping(value = "/add", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
			MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<?> addSubject(@RequestBody Subject subject, UriComponentsBuilder ucBuilder) {
		subject = subjectService.saveSubject(subject);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/subjects/{id}").buildAndExpand(subject.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);

	}

	@GetMapping(value="/{subjectId}",produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = { MediaType.APPLICATION_JSON_VALUE })
	public Subject getSubject(@PathVariable Long subjectId) {
		return subjectService.getSubject(subjectId);
	}

	public SubjectController(@Autowired SubjectService subjectService) {
		super();
		this.subjectService = subjectService;
	}

}
