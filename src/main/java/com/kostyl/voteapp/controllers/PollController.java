package com.kostyl.voteapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.kostyl.voteapp.entity.Poll;
import com.kostyl.voteapp.services.PollService;

@RestController
@RequestMapping("/polls")
public class PollController {
	@Autowired
	private PollService pollService;

	@GetMapping(value = "/", consumes = { MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public List<Poll> getPolls() {
		return null;
	}

	@GetMapping(value = "/{pollLink}", consumes = { MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public Poll getPoll(@PathVariable String pollLink) {
		return pollService.getPoll(pollLink);
	}

	@PostMapping(value = "/start", consumes = { MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> startPoll(@RequestBody Poll poll, UriComponentsBuilder ucBuilder) {
		pollService.startPoll(poll);

		return new ResponseEntity<String>(
				ucBuilder.path("/polls/{link}").buildAndExpand(poll.getLink()).toUri().toString(), HttpStatus.CREATED);
	}

	@PutMapping(value = "/{pollId}/answers/{answerName}/vote", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> vote(@PathVariable Long pollId, @PathVariable String answerName) {
		return null;
	}

	@PutMapping(value = "/{pollId}", consumes = { MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public ResponseEntity<?> closePoll(@PathVariable Long pollId) {
		return null;
	}
}
