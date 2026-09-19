import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/task.dart';

class ApiService {
  static const String baseUrl =
      'https://task-manager-backend-dxcz.onrender.com/api';

  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ),
  );

  Future<void> login(String email, String password) async {
    final response = await _dio.post(
      '/auth/login',
      data: {
        'email': email,
        'password': password,
      },
    );

    final token = response.data['token'];

    if (token == null) {
      throw Exception('Token JWT non reçu');
    }

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
  }

Future<void> register({
  required String name,
  required String email,
  required String password,
}) async {
  try {
    await _dio.post(
      '/auth/register',
      data: {
        'name': name,
        'email': email,
        'password': password,
      },
    );
  } on DioException catch (e) {
    final statusCode = e.response?.statusCode;
    final responseData = e.response?.data;

    if (statusCode == 409) {
      throw Exception(
        'Cette adresse email est déjà utilisée.',
      );
    }

    if (statusCode == 400) {
      if (responseData is Map &&
          responseData['message'] != null) {
        throw Exception(responseData['message']);
      }

      throw Exception(
        'Les informations saisies sont invalides.',
      );
    }

    throw Exception(
      'Impossible de créer le compte.',
    );
  }
}
  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
  }

  Options _authOptions(String token) {
    return Options(
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
  }

  Future<List<Task>> getTasks() async {
    final token = await getToken();

    if (token == null) {
      throw Exception('Session expirée');
    }

    final response = await _dio.get(
      '/tasks',
      options: _authOptions(token),
    );

    final data = response.data;

    if (data is Map && data['content'] != null) {
      return (data['content'] as List)
          .map((json) => Task.fromJson(json))
          .toList();
    }

    if (data is List) {
      return data
          .map((json) => Task.fromJson(json))
          .toList();
    }

    return [];
  }

  Future<void> createTask({
    required String title,
    String? description,
    required String status,
  }) async {
    final token = await getToken();

    if (token == null) {
      throw Exception('Session expirée');
    }

    await _dio.post(
      '/tasks',
      data: {
        'title': title,
        'description': description,
        'status': status,
      },
      options: _authOptions(token),
    );
  }

  Future<void> updateTask({
    required int id,
    required String title,
    String? description,
    required String status,
  }) async {
    final token = await getToken();

    if (token == null) {
      throw Exception('Session expirée');
    }

    await _dio.put(
      '/tasks/$id',
      data: {
        'title': title,
        'description': description,
        'status': status,
      },
      options: _authOptions(token),
    );
  }

  Future<void> deleteTask(int id) async {
    final token = await getToken();

    if (token == null) {
      throw Exception('Session expirée');
    }

    await _dio.delete(
      '/tasks/$id',
      options: _authOptions(token),
    );
  }
}