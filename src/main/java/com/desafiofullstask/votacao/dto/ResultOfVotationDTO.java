package com.desafiofullstask.votacao.dto;

public class ResultOfVotationDTO {

    private String vote;

    private Long totalVotes;



    public ResultOfVotationDTO(String vote, Long totalVotes) {
        this.vote = vote;
        this.totalVotes = totalVotes;
    }

    public String getVote() {
        return vote;
    }

    public void setVote(String vote) {
        this.vote = vote;
    }

    public Long getTotalVotes() {
        return totalVotes;
    }

    public void setTotalVotes(Long totalVotes) {
        this.totalVotes = totalVotes;
    }
}
