package com.kostyl.voteapp.pojo;

import java.util.List;

import com.kostyl.voteapp.entity.Answer;

public class StartPollPojo {
	private Long subjectId;
	private List<Answer> answers;

	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}

}
