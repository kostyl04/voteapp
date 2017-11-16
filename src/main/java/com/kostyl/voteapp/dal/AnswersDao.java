package com.kostyl.voteapp.dal;

import org.springframework.data.repository.CrudRepository;

import com.kostyl.voteapp.entity.Answer;
import com.kostyl.voteapp.entity.Poll;

public interface AnswersDao extends CrudRepository<Answer, Long> {
	Answer findByNameAndPollId(String name, Long pollId);

}
