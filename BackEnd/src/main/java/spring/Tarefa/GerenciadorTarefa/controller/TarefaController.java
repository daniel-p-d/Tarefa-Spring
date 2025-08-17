package spring.Tarefa.GerenciadorTarefa.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import spring.Tarefa.GerenciadorTarefa.model.Tarefa;
import spring.Tarefa.GerenciadorTarefa.service.TarefaService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/tarefa")
public class TarefaController {
    
    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }
    
    @GetMapping
    public List<Tarefa> listar() {
        return tarefaService.listarTarefas();
    }
    

    @PostMapping("/criar")
    public ResponseEntity<Tarefa> criarTarefa(@RequestBody Tarefa tarefa){
        Tarefa novaTarefa = tarefaService.criarTarefa(tarefa);
        return ResponseEntity.ok(novaTarefa);
    }

    @PatchMapping("/atualizar/{id}")
    public ResponseEntity<Tarefa> atualizar(@RequestBody Tarefa tarefa, @PathVariable Long id){
        Tarefa tarefaAtualizada = tarefaService.atualizarTarefa(id, tarefa);
        return ResponseEntity.ok(tarefaAtualizada);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id){
        tarefaService.excluirTarefa(id);
        return ResponseEntity.noContent().build();
    }

}
