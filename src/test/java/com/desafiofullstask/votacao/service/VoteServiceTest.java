package com.desafiofullstask.votacao.service;

import com.desafiofullstask.votacao.entity.Vote;
import com.desafiofullstask.votacao.repository.VoteRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class VoteServiceTest {

    @Autowired
    private VoteService voteService;

    @Autowired
    private VoteRepository voteRepository;

    @Test
    void save() {
        Vote vote = new Vote();
        vote.setVote("Sim");
        vote.setAssociatedId(1);
        vote.setDiscussId(1);
        vote = voteService.save(vote);

        assertThat(vote.getId()).isNotNull();

    }

    @Test
    void findVoteById() {
        Vote retrievedVote = voteService.findVoteById(1);
        assertThat(retrievedVote).isNotNull();
    }

    @Test
    void delete() {
        Vote vote = new Vote();
        vote.setVote("Sim");
        vote.setAssociatedId(1);
        vote.setDiscussId(1);
        vote = voteService.save(vote);

        voteService.delete(vote.getId());

        Vote retrievedVote = voteRepository.findById(vote.getId()).orElse(null);
        assertThat(retrievedVote).isNull();
    }

    @Test
    void sumAllVotes() {
        voteService.getTheVotes(1);
    }
}