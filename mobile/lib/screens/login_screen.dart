import 'package:flutter/material.dart';

import '../services/api_service.dart';
import 'dashboard_screen.dart';
import 'register_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();

  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  final ApiService apiService = ApiService();

  bool loading = false;
  bool obscurePassword = true;
  String? errorMessage;

  Future<void> login() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      loading = true;
      errorMessage = null;
    });

    try {
      await apiService.login(
        emailController.text.trim(),
        passwordController.text,
      );

      if (!mounted) return;

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => const DashboardScreen(),
        ),
      );
    } catch (e) {
      if (!mounted) return;

      setState(() {
        errorMessage = 'Email ou mot de passe incorrect.';
      });
    } finally {
      if (mounted) {
        setState(() {
          loading = false;
        });
      }
    }
  }

  void goToRegister() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => const RegisterScreen(),
      ),
    );
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.colorScheme.surfaceContainerLowest,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(
                maxWidth: 448,
              ),
              child: Column(
                children: [
                  // Logo
                  Container(
                    width: 52,
                    height: 52,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: const Icon(
                      Icons.check_rounded,
                      color: Colors.white,
                      size: 30,
                    ),
                  ),

                  const SizedBox(height: 20),

                  const Text(
                    'Task Manager',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 32),

                  // Card
                  Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: theme.dividerColor,
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        crossAxisAlignment:
                            CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Connexion',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),

                          const SizedBox(height: 6),

                          Text(
                            'Connectez-vous à votre espace Task Manager.',
                            style: TextStyle(
                              color: theme
                                  .colorScheme
                                  .onSurfaceVariant,
                              fontSize: 14,
                            ),
                          ),

                          const SizedBox(height: 24),

                          Form(
                            key: _formKey,
                            child: Column(
                              crossAxisAlignment:
                                  CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Adresse email',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),

                                const SizedBox(height: 8),

                                TextFormField(
                                  controller: emailController,
                                  keyboardType:
                                      TextInputType.emailAddress,
                                  textInputAction:
                                      TextInputAction.next,
                                  decoration:
                                      const InputDecoration(
                                    hintText:
                                        'vous@example.com',
                                    border:
                                        OutlineInputBorder(),
                                  ),
                                  validator: (value) {
                                    if (value == null ||
                                        value.trim().isEmpty) {
                                      return 'Adresse email obligatoire';
                                    }

                                    if (!value.contains('@')) {
                                      return 'Adresse email invalide';
                                    }

                                    return null;
                                  },
                                ),

                                const SizedBox(height: 20),

                                const Text(
                                  'Mot de passe',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),

                                const SizedBox(height: 8),

                                TextFormField(
                                  controller: passwordController,
                                  obscureText: obscurePassword,
                                  textInputAction:
                                      TextInputAction.done,
                                  onFieldSubmitted: (_) {
                                    if (!loading) {
                                      login();
                                    }
                                  },
                                  decoration: InputDecoration(
                                    hintText: '••••••••',
                                    border:
                                        const OutlineInputBorder(),
                                    suffixIcon: IconButton(
                                      onPressed: () {
                                        setState(() {
                                          obscurePassword =
                                              !obscurePassword;
                                        });
                                      },
                                      icon: Icon(
                                        obscurePassword
                                            ? Icons
                                                .visibility_outlined
                                            : Icons
                                                .visibility_off_outlined,
                                      ),
                                    ),
                                  ),
                                  validator: (value) {
                                    if (value == null ||
                                        value.isEmpty) {
                                      return 'Mot de passe obligatoire';
                                    }

                                    return null;
                                  },
                                ),

                                // Error
                                if (errorMessage != null) ...[
                                  const SizedBox(height: 16),
                                  Container(
                                    width: double.infinity,
                                    padding:
                                        const EdgeInsets.all(12),
                                    decoration: BoxDecoration(
                                      color: theme
                                          .colorScheme
                                          .errorContainer,
                                      borderRadius:
                                          BorderRadius.circular(8),
                                      border: Border.all(
                                        color: theme
                                            .colorScheme
                                            .error
                                            .withValues(alpha: 0.3),
                                      ),
                                    ),
                                    child: Text(
                                      errorMessage!,
                                      style: TextStyle(
                                        color: theme
                                            .colorScheme
                                            .onErrorContainer,
                                        fontSize: 14,
                                      ),
                                    ),
                                  ),
                                ],

                                const SizedBox(height: 20),

                                // Login button
                                SizedBox(
                                  width: double.infinity,
                                  height: 48,
                                  child: ElevatedButton(
                                    onPressed:
                                        loading ? null : login,
                                    child: loading
                                        ? const SizedBox(
                                            width: 20,
                                            height: 20,
                                            child:
                                                CircularProgressIndicator(
                                              strokeWidth: 2,
                                            ),
                                          )
                                        : const Text(
                                            'Se connecter',
                                            style: TextStyle(
                                              fontWeight:
                                                  FontWeight.w600,
                                            ),
                                          ),
                                  ),
                                ),
                              ],
                            ),
                          ),

                          const SizedBox(height: 20),

                          // Register link
                          Center(
                            child: Wrap(
                              alignment: WrapAlignment.center,
                              children: [
                                Text(
                                  "Vous n'avez pas encore de compte ? ",
                                  style: TextStyle(
                                    color: theme
                                        .colorScheme
                                        .onSurfaceVariant,
                                    fontSize: 14,
                                  ),
                                ),
                                GestureDetector(
                                  onTap: goToRegister,
                                  child: Text(
                                    'Créer un compte',
                                    style: TextStyle(
                                      color: theme
                                          .colorScheme
                                          .onSurface,
                                      fontSize: 14,
                                      fontWeight:
                                          FontWeight.w600,
                                      decoration:
                                          TextDecoration.underline,
                                      decorationThickness: 1.5,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}