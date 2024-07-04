package com.desafiofullstask.votacao.service;

import com.desafiofullstask.votacao.repository.SessionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SessionServiceTest {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private SessionRepository sessionRepository;

    @Test
    void findSessionById() {

    }

    @Test
    void save() {
    }

    @Test
    void delete() {
    }
}