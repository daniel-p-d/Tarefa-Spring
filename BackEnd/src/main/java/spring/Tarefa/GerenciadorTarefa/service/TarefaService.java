package spring.Tarefa.GerenciadorTarefa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import spring.Tarefa.GerenciadorTarefa.model.Tarefa;
import spring.Tarefa.GerenciadorTarefa.repository.TarefaRepository;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository){
        this.tarefaRepository = tarefaRepository;
    }

    public Tarefa criarTarefa(Tarefa tarefa){
        return tarefaRepository.save(tarefa);
    }

    public Tarefa atualizarTarefa(Long id, Tarefa tarefa){
        Tarefa tarefaAtualizada = tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com o id: " + id));

        if (tarefa.getTitulo() != null) {
        tarefaAtualizada.setTitulo(tarefa.getTitulo());
        }
        if (tarefa.getDescricao() != null) {
            tarefaAtualizada.setDescricao(tarefa.getDescricao());
        }
        if (tarefa.getStatus() != null) {
            tarefaAtualizada.setStatus(tarefa.getStatus());
        }

        return tarefaRepository.save(tarefaAtualizada);
    }

    public void excluirTarefa(Long id){
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com o id: " + id));

        tarefaRepository.delete(tarefa);
    }

    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }

}