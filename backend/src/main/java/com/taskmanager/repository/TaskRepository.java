package com.taskmanager.repository;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    List<Task> findAllByUserIdAndStatusOrderByCreatedAtDesc(
            Long userId,
            TaskStatus status
    );

    List<Task> findAllByUserIdAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(
            Long userId,
            String title
    );

    List<Task> findAllByUserIdAndStatusAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(
            Long userId,
            TaskStatus status,
            String title
    );

    Optional<Task> findByIdAndUserId(Long id, Long userId);
}