package com.kostyl.voteapp.services;

import java.util.List;

import com.kostyl.voteapp.entity.Subject;

public interface SubjectService {
	Subject getSubject(Long id);

	List<Subject> getSubjects();

	Subject saveSubject(Subject subject);
}
