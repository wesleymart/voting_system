package com.desafiofullstask.votacao.service;

import com.desafiofullstask.votacao.entity.Discuss;
import com.desafiofullstask.votacao.enums.SessionStatusEmum;
import com.desafiofullstask.votacao.repository.DiscussRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class DiscussService {

    @Autowired
    private DiscussRepository discussRepository;

    @Autowired
    private SessionService sessionService;

    private SessionStatusEmum status;

    public Discuss findDiscussById(Integer id) {
        return discussRepository.findById(id).orElse(null);
    }

    public List<Discuss> findAllDiscuss() {
        return discussRepository.findAll();
    }

    public Discuss save(Discuss discuss) {
        LocalDateTime now = LocalDateTime.now();
        ZonedDateTime zonedDateTime = now.atZone(ZoneId.systemDefault());
        Timestamp timestamp = Timestamp.from(zonedDateTime.toInstant());
        discuss.getSession().setCreatedTime(timestamp);
        discuss.getSession().setStatus(SessionStatusEmum.OPEN.ordinal());
        sessionService.save(discuss.getSession());
        return discussRepository.save(discuss);
    }

    public void delete(Integer id) {
        discussRepository.deleteById(id);
    }

}
