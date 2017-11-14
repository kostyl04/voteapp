package com.kostyl.voteapp.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Poll {
	@Id
	@GeneratedValue
	@Column(name = "poll_id")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "subject_id", referencedColumnName = "subject_id")
	private Subject subject;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="pollId")
	private List<Answer> answers;
	@Column
	private boolean closed;
	@Column
	private String link;

	public Poll(String link, Subject subject) {
		this.closed = false;
		this.link = link;
		this.subject = subject;

	}

	public Poll() {

	}

	public boolean isClosed() {
		return closed;
	}

	public void setClosed(boolean closed) {
		this.closed = closed;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}

}
