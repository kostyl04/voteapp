package com.kostyl.voteapp.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kostyl.voteapp.dal.SubjectDao;
import com.kostyl.voteapp.entity.Subject;

@Service
@Transactional
public class SubjectServiceImpl implements SubjectService {
	private SubjectDao subjectDao;

	@Override
	public Subject getSubject(Long id) {

		return subjectDao.findOne(id);
	}

	@Override
	public List<Subject> getSubjects() {
		// TODO Auto-generated method stub
		return (List<Subject>) subjectDao.findAll();
	}

	@Override
	public Subject saveSubject(Subject subject) {
		return subjectDao.save(subject);

	}

	public SubjectServiceImpl(@Autowired SubjectDao subjectDao) {
		super();
		this.subjectDao = subjectDao;
	}

}
