package com.kostyl.voteapp.services;

import java.util.List;

import com.kostyl.voteapp.entity.Answer;
import com.kostyl.voteapp.entity.Poll;

public interface PollService {
	Poll startPoll(Poll poll);
	Poll getPoll(String link);
}
