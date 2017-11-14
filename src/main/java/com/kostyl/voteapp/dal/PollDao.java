package com.kostyl.voteapp.dal;

import org.springframework.data.repository.CrudRepository;

import com.kostyl.voteapp.entity.Poll;

public interface PollDao extends CrudRepository<Poll, Long> {
	Poll findPollByLink(String link);
}
