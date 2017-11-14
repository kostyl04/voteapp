package com.kostyl.voteapp.dal;

import org.springframework.data.repository.CrudRepository;

import com.kostyl.voteapp.entity.Subject;

public interface SubjectDao extends CrudRepository<Subject, Long> {

}
