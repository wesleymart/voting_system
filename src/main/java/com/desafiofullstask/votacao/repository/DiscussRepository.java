package com.desafiofullstask.votacao.repository;

import com.desafiofullstask.votacao.entity.Discuss;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussRepository extends JpaRepository<Discuss, Integer> {
}
