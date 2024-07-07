package com.desafiofullstask.votacao.repository;

import com.desafiofullstask.votacao.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Integer> {

    @Query(value = "SELECT vote, COUNT(vote) as total FROM Vote v WHERE v.discussId = ?1 GROUP BY vote")
    List<Object[]> countAllVotes(Integer discussId);

    Optional<Vote> findByAssociatedCpfAndDiscussId(String associatedCpf, Integer discussId);
}
