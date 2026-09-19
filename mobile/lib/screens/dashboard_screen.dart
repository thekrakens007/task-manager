import 'package:flutter/material.dart';

import '../models/task.dart';
import '../services/api_service.dart';
import '../widgets/stat_card.dart';
import '../widgets/task_card.dart';
import 'login_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiService apiService = ApiService();

  List<Task> tasks = [];

  bool loading = true;

  String search = '';
  String selectedStatus = 'ALL';

  @override
  void initState() {
    super.initState();
    loadTasks();
  }

  Future<void> loadTasks() async {
    setState(() {
      loading = true;
    });

    try {
      final result = await apiService.getTasks();

      if (!mounted) return;

      setState(() {
        tasks = result;
      });
    } catch (e) {
      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Impossible de charger les tâches',
          ),
        ),
      );
    } finally {
      if (mounted) {
        setState(() {
          loading = false;
        });
      }
    }
  }

  List<Task> get filteredTasks {
    return tasks.where((task) {
      final matchesSearch =
          task.title.toLowerCase().contains(
                search.toLowerCase(),
              ) ||
          (task.description ?? '')
              .toLowerCase()
              .contains(search.toLowerCase());

      final matchesStatus =
          selectedStatus == 'ALL' ||
          task.status == selectedStatus;

      return matchesSearch && matchesStatus;
    }).toList();
  }

  int get total => tasks.length;

  int get todo =>
      tasks.where((task) => task.status == 'TODO').length;

  int get inProgress => tasks
      .where((task) => task.status == 'IN_PROGRESS')
      .length;

  int get done =>
      tasks.where((task) => task.status == 'DONE').length;

  Future<void> logout() async {
    await apiService.logout();

    if (!mounted) return;

    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (_) => const LoginScreen(),
      ),
      (_) => false,
    );
  }

  Future<void> deleteTask(Task task) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Supprimer la tâche'),
          content: Text(
            'Voulez-vous supprimer "${task.title}" ?',
          ),
          actions: [
            TextButton(
              onPressed: () =>
                  Navigator.pop(context, false),
              child: const Text('Annuler'),
            ),
            FilledButton(
              onPressed: () =>
                  Navigator.pop(context, true),
              child: const Text('Supprimer'),
            ),
          ],
        );
      },
    );

    if (confirmed != true) return;

    try {
      await apiService.deleteTask(task.id);
      await loadTasks();
    } catch (e) {
      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Erreur lors de la suppression'),
        ),
      );
    }
  }

  Future<void> showTaskForm({Task? task}) async {
    final titleController = TextEditingController(
      text: task?.title ?? '',
    );

    final descriptionController =
        TextEditingController(
      text: task?.description ?? '',
    );

    String status = task?.status ?? 'TODO';

    await showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 10,
                bottom:
                    MediaQuery.of(context).viewInsets.bottom +
                        20,
              ),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment:
                      CrossAxisAlignment.start,
                  children: [
                    Text(
                      task == null
                          ? 'Nouvelle tâche'
                          : 'Modifier la tâche',
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    const SizedBox(height: 20),

                    TextField(
                      controller: titleController,
                      decoration: const InputDecoration(
                        labelText: 'Titre',
                        prefixIcon:
                            Icon(Icons.title_outlined),
                        border: OutlineInputBorder(),
                      ),
                    ),

                    const SizedBox(height: 16),

                    TextField(
                      controller: descriptionController,
                      maxLines: 4,
                      decoration: const InputDecoration(
                        labelText: 'Description',
                        prefixIcon:
                            Icon(Icons.notes_outlined),
                        border: OutlineInputBorder(),
                      ),
                    ),

                    const SizedBox(height: 16),

                    DropdownButtonFormField<String>(
                      initialValue: status,
                      decoration: const InputDecoration(
                        labelText: 'Statut',
                        border: OutlineInputBorder(),
                      ),
                      items: const [
                        DropdownMenuItem(
                          value: 'TODO',
                          child: Text('À faire'),
                        ),
                        DropdownMenuItem(
                          value: 'IN_PROGRESS',
                          child: Text('En cours'),
                        ),
                        DropdownMenuItem(
                          value: 'DONE',
                          child: Text('Terminée'),
                        ),
                      ],
                      onChanged: (value) {
                        if (value != null) {
                          setModalState(() {
                            status = value;
                          });
                        }
                      },
                    ),

                    const SizedBox(height: 22),

                    SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: FilledButton(
                        onPressed: () async {
                          final title =
                              titleController.text.trim();

                          if (title.isEmpty) {
                            ScaffoldMessenger.of(context)
                                .showSnackBar(
                              const SnackBar(
                                content: Text(
                                  'Le titre est obligatoire',
                                ),
                              ),
                            );
                            return;
                          }

                          try {
                            if (task == null) {
                              await apiService.createTask(
                                title: title,
                                description:
                                    descriptionController
                                        .text
                                        .trim(),
                                status: status,
                              );
                            } else {
                              await apiService.updateTask(
                                id: task.id,
                                title: title,
                                description:
                                    descriptionController
                                        .text
                                        .trim(),
                                status: status,
                              );
                            }

                            if (!context.mounted) return;

                            Navigator.pop(context);

                            await loadTasks();
                          } catch (e) {
                            if (!context.mounted) return;

                            ScaffoldMessenger.of(context)
                                .showSnackBar(
                              const SnackBar(
                                content: Text(
                                  'Erreur lors de l\'enregistrement',
                                ),
                              ),
                            );
                          }
                        },
                        child: Text(
                          task == null
                              ? 'Créer la tâche'
                              : 'Enregistrer',
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );

    titleController.dispose();
    descriptionController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor:
          theme.colorScheme.surfaceContainerLowest,

      appBar: AppBar(
        elevation: 0,
        backgroundColor:
            theme.colorScheme.surfaceContainerLowest,
        titleSpacing: 20,
        title: const Row(
          children: [
            Icon(Icons.check_circle_outline),
            SizedBox(width: 10),
            Text(
              'Task Manager',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'Actualiser',
            onPressed: loadTasks,
            icon: const Icon(Icons.refresh),
          ),
          PopupMenuButton<String>(
            onSelected: (value) {
              if (value == 'logout') {
                logout();
              }
            },
            itemBuilder: (context) => const [
              PopupMenuItem(
                value: 'logout',
                child: Row(
                  children: [
                    Icon(Icons.logout),
                    SizedBox(width: 10),
                    Text('Déconnexion'),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),
        ],
      ),

      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => showTaskForm(),
        icon: const Icon(Icons.add),
        label: const Text('Nouvelle tâche'),
      ),

      body: RefreshIndicator(
        onRefresh: loadTasks,
        child: loading
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : ListView(
                padding: const EdgeInsets.fromLTRB(
                  20,
                  10,
                  20,
                  100,
                ),
                children: [
                  const Text(
                    'Dashboard',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 6),

                  Text(
                    'Gérez vos tâches simplement.',
                    style: TextStyle(
                      color: theme
                          .colorScheme
                          .onSurfaceVariant,
                    ),
                  ),

                  const SizedBox(height: 24),

                  GridView.count(
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    shrinkWrap: true,
                    physics:
                        const NeverScrollableScrollPhysics(),
                    childAspectRatio: 1.65,
                    children: [
                      StatCard(
                        title: 'Total',
                        value: total,
                        icon: Icons.task_alt,
                      ),
                      StatCard(
                        title: 'À faire',
                        value: todo,
                        icon: Icons.schedule,
                      ),
                      StatCard(
                        title: 'En cours',
                        value: inProgress,
                        icon: Icons.timelapse,
                      ),
                      StatCard(
                        title: 'Terminées',
                        value: done,
                        icon: Icons.check_circle_outline,
                      ),
                    ],
                  ),

                  const SizedBox(height: 30),

                  const Text(
                    'Mes tâches',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 14),

                  TextField(
                    onChanged: (value) {
                      setState(() {
                        search = value;
                      });
                    },
                    decoration: InputDecoration(
                      hintText: 'Rechercher une tâche...',
                      prefixIcon:
                          const Icon(Icons.search),
                      filled: true,
                      fillColor:
                          theme.colorScheme.surface,
                      border: OutlineInputBorder(
                        borderRadius:
                            BorderRadius.circular(16),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),

                  const SizedBox(height: 12),

                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        _filterChip('ALL', 'Toutes'),
                        _filterChip('TODO', 'À faire'),
                        _filterChip(
                          'IN_PROGRESS',
                          'En cours',
                        ),
                        _filterChip('DONE', 'Terminées'),
                      ],
                    ),
                  ),

                  const SizedBox(height: 18),

                  if (filteredTasks.isEmpty)
                    Container(
                      padding: const EdgeInsets.all(35),
                      decoration: BoxDecoration(
                        color:
                            theme.colorScheme.surface,
                        borderRadius:
                            BorderRadius.circular(18),
                      ),
                      child: const Column(
                        children: [
                          Icon(
                            Icons.inbox_outlined,
                            size: 48,
                          ),
                          SizedBox(height: 12),
                          Text(
                            'Aucune tâche trouvée',
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    )
                  else
                    ...filteredTasks.map(
                      (task) => TaskCard(
                        task: task,
                        onEdit: () =>
                            showTaskForm(task: task),
                        onDelete: () =>
                            deleteTask(task),
                      ),
                    ),
                ],
              ),
      ),
    );
  }

  Widget _filterChip(
    String value,
    String label,
  ) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        label: Text(label),
        selected: selectedStatus == value,
        onSelected: (_) {
          setState(() {
            selectedStatus = value;
          });
        },
      ),
    );
  }
}