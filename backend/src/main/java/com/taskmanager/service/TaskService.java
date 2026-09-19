package com.taskmanager.service;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.TaskResponse;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.entity.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<TaskResponse> getUserTasks(
            String email,
            TaskStatus status,
            String search
    ) {

        User user = getUserByEmail(email);

        List<Task> tasks;

        boolean hasSearch = search != null && !search.isBlank();

        if (status != null && hasSearch) {

            tasks = taskRepository
                    .findAllByUserIdAndStatusAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(
                            user.getId(),
                            status,
                            search.trim()
                    );

        } else if (status != null) {

            tasks = taskRepository
                    .findAllByUserIdAndStatusOrderByCreatedAtDesc(
                            user.getId(),
                            status
                    );

        } else if (hasSearch) {

            tasks = taskRepository
                    .findAllByUserIdAndTitleContainingIgnoreCaseOrderByCreatedAtDesc(
                            user.getId(),
                            search.trim()
                    );

        } else {

            tasks = taskRepository
                    .findAllByUserIdOrderByCreatedAtDesc(
                            user.getId()
                    );
        }

        return tasks.stream()
                .map(this::toResponse)
                .toList();
    }

    public TaskResponse createTask(
            String email,
            TaskRequest request
    ) {

        User user = getUserByEmail(email);

        Task task = new Task();

        task.setTitle(request.title());
        task.setDescription(request.description());

        if (request.status() != null) {
            task.setStatus(request.status());
        } else {
            task.setStatus(TaskStatus.TODO);
        }

        task.setUser(user);

        Task savedTask = taskRepository.save(task);

        return toResponse(savedTask);
    }

    public TaskResponse updateTask(
            String email,
            Long taskId,
            TaskRequest request
    ) {

        User user = getUserByEmail(email);

        Task task = taskRepository
                .findByIdAndUserId(taskId, user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Tâche introuvable"
                        )
                );

        task.setTitle(request.title());
        task.setDescription(request.description());

        if (request.status() != null) {
            task.setStatus(request.status());
        }

        Task updatedTask = taskRepository.save(task);

        return toResponse(updatedTask);
    }

    public void deleteTask(
            String email,
            Long taskId
    ) {

        User user = getUserByEmail(email);

        Task task = taskRepository
                .findByIdAndUserId(taskId, user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Tâche introuvable"
                        )
                );

        taskRepository.delete(task);
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Utilisateur introuvable"
                        )
                );
    }

    private TaskResponse toResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}