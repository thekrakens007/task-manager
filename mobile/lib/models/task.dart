class Task {
  final int id;
  final String title;
  final String? description;
  final String status;
  final String? createdAt;
  final String? updatedAt;

  Task({
    required this.id,
    required this.title,
    this.description,
    required this.status,
    this.createdAt,
    this.updatedAt,
  });

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['id'] as int,
      title: json['title'] ?? '',
      description: json['description'],
      status: json['status'] ?? 'TODO',
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }
}