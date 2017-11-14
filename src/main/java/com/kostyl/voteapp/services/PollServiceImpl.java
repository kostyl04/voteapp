package com.kostyl.voteapp.services;

import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.kostyl.voteapp.dal.PollDao;
import com.kostyl.voteapp.entity.Answer;
import com.kostyl.voteapp.entity.Poll;
import com.kostyl.voteapp.entity.Subject;
import com.kostyl.voteapp.exceptions.CustomException;

@Service
@Transactional
public class PollServiceImpl implements PollService {
	@Autowired
	private SubjectService subjectService;
	@Autowired
	private PollDao pollDao;

	@Override
	public Poll startPoll(Poll poll) {
		Subject subject = subjectService.getSubject(poll.getSubject().getId());
		if (subject == null)
			throw new CustomException("Cant find subject with id:" + poll.getSubject().getId(), HttpStatus.NOT_FOUND);
		if (poll.getId() != null)
			throw new CustomException("Poll Id must be null!", HttpStatus.CONFLICT);
		for (Answer a : poll.getAnswers()) {
			if (a.getId() != null)
				throw new CustomException("Answer Id must be null!", HttpStatus.CONFLICT);
		}
		poll.setLink(generatePollLink());
		poll = pollDao.save(poll);
		return poll;
	}

	@Override
	public Poll getPoll(String link) {
		Poll poll = pollDao.findPollByLink(link);
		if (poll == null)
			throw new CustomException("No poll for link:" + link, HttpStatus.NOT_FOUND);
		return poll;
	}

	private String generatePollLink() {

		String generatedLink = UUID.randomUUID().toString();

		Poll poll = pollDao.findPollByLink(generatedLink);
		while (poll != null) {
			generatedLink = UUID.randomUUID().toString();
			poll = pollDao.findPollByLink(generatedLink);
		}
		return generatedLink;
	}

}
