package com.desafiofullstask.votacao.service;

import com.desafiofullstask.votacao.entity.Associated;
import com.desafiofullstask.votacao.repository.AssociatedRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class AssociatedServiceTest {

    @Autowired
    private AssociatedService associatedService;

    @Autowired
    private AssociatedRepository associatedRepository;

    @Test
    void findAssociatedById() {

        Associated retrievedAssociated = associatedService.findAssociatedById(1);
        assertThat(retrievedAssociated).isNotNull();
        assertThat(retrievedAssociated.getName()).isEqualTo("Associated 1");
        assertThat(retrievedAssociated.getCpf()).isEqualTo("12345678901");

    }

    @Test
    void save() {
        Associated associated = new Associated();
        associated.setName("Associated 1");
        associated.setCpf("12345678901");
        associated = associatedService.save(associated);

        assertThat(associated.getId()).isNotNull();
    }

    @Test
    void deleteById() {
        Associated associated = new Associated();
        associated.setName("Associated 1");
        associated.setCpf("12345678901");
        associated = associatedService.save(associated);

        associatedService.delete(associated.getId());

        Associated retrievedAssociated = associatedRepository.findById(associated.getId()).orElse(null);
        assertThat(retrievedAssociated).isNull();

    }
}