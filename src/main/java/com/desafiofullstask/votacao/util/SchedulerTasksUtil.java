package com.desafiofullstask.votacao.util;

import com.desafiofullstask.votacao.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Component
public class SchedulerTasksUtil {

    @Autowired
    private SessionRepository sessionRepository;

    @Scheduled(fixedRate = 60000)
    public void scheduleChangeStatusOfSessions() {

        LocalDateTime now = LocalDateTime.now();
        ZonedDateTime zonedDateTime = now.atZone(ZoneId.systemDefault());
        Timestamp timestamp = Timestamp.from(zonedDateTime.toInstant());

        sessionRepository.findSessionsToChangeStatus(timestamp).forEach(session -> {
            session.setStatus(2);
            sessionRepository.save(session);
        });
    }
}
