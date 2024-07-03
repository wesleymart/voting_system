package com.desafiofullstask.votacao.repository;

import com.desafiofullstask.votacao.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Integer> {
}
