package com.kostyl.voteapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Subject {
	@Id
	@GeneratedValue
	@Column(name = "subject_id")
	private Long id;
	@Column
	private String title;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Subject(String title) {
		super();
		this.title = title;
	}

	public Subject() {

	}

}
