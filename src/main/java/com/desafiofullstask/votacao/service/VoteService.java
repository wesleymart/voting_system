package com.desafiofullstask.votacao.service;

import com.desafiofullstask.votacao.entity.Vote;
import com.desafiofullstask.votacao.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public Vote save(Vote vote) {
        return voteRepository.save(vote);
    }

    public Vote findVoteById(Integer id) {
        return voteRepository.findById(id).orElse(null);
    }

    public void delete(Integer id) {
        voteRepository.deleteById(id);
    }
}
