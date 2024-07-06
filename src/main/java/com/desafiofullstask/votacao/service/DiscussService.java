package com.desafiofullstask.votacao.service;

import com.desafiofullstask.votacao.entity.Discuss;
import com.desafiofullstask.votacao.repository.DiscussRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiscussService {

    @Autowired
    private DiscussRepository discussRepository;

    public Discuss findDiscussById(Integer id) {
        return discussRepository.findById(id).orElse(null);
    }

    public Discuss save(Discuss discuss) {
        return discussRepository.save(discuss);
    }

    public void delete(Integer id) {
        discussRepository.deleteById(id);
    }

}
