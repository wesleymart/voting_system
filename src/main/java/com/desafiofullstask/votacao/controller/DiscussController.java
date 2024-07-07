package com.desafiofullstask.votacao.controller;


import com.desafiofullstask.votacao.entity.Discuss;
import com.desafiofullstask.votacao.service.DiscussService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/discuss")
public class DiscussController {

    @Autowired
    private DiscussService discussService;

    @GetMapping("/{id}")
    public ResponseEntity<Discuss> get(
            @PathVariable("id") Integer id) {
        return ResponseEntity.ok().body(discussService.findDiscussById(id));
    }

    @GetMapping()
    public ResponseEntity<List<Discuss>> getAllDiscusses() {
        return ResponseEntity.ok().body(discussService.findAllDiscuss());
    }

    @PostMapping
    public ResponseEntity<Discuss> save(
            @RequestBody Discuss newDiscuss
    ) {
        return ResponseEntity.ok().body(discussService.save(newDiscuss));
    }

    @PutMapping
    public ResponseEntity<Discuss> update(
            @RequestBody Discuss discuss
    ) {
        return ResponseEntity.ok().body(discussService.save(discuss));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(
            @PathVariable("id") Integer id
    ) {
        discussService.delete(id);
        return ResponseEntity.ok().build();
    }
}
