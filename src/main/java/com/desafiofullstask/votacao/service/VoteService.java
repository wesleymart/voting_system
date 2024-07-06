package com.desafiofullstask.votacao.service;

import com.desafiofullstask.votacao.dto.ResultOfVotationDTO;
import com.desafiofullstask.votacao.entity.Vote;
import com.desafiofullstask.votacao.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public ResultOfVotationDTO getTheVotes(Integer discussId) {
        List<Object[]> allVotes = voteRepository.countAllVotes(discussId);

        for (Object[] result : allVotes) {
            String vote = (String) result[0];
            Long count = (Long) result[1];
            ResultOfVotationDTO resultOfVotationDTO = new ResultOfVotationDTO(vote, count);
            return resultOfVotationDTO;

        }
        return null;
    }
}
