package com.kostyl.voteapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Answer {
	@Id
	@GeneratedValue
	@Column(name = "answer_id")
	private Long id;
	@Column
	private String name;
	@Column
	private Long votes;
	@Column
	private Long pollId;

	
	public Long getPollId() {
		return pollId;
	}

	public void setPollId(Long pollId) {
		this.pollId = pollId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getVotes() {
		return votes;
	}

	public void setVotes(Long votes) {
		this.votes = votes;
	}

	public void incrementVotes() {
		this.votes++;
	}

	public Answer() {
		super();
		this.votes = 0L;
	}

}
