package spring.Tarefa.GerenciadorTarefa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import spring.Tarefa.GerenciadorTarefa.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long>{
    
}
