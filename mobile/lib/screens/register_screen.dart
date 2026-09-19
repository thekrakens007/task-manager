import 'package:flutter/material.dart';

import '../services/api_service.dart';
import 'login_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();

  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();

  final ApiService apiService = ApiService();

  bool loading = false;
  bool obscurePassword = true;
  bool obscureConfirmPassword = true;
  String? errorMessage;

  Future<void> register() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      loading = true;
      errorMessage = null;
    });

    try {
      await apiService.register(
        name: nameController.text.trim(),
        email: emailController.text.trim(),
        password: passwordController.text,
      );

      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Compte créé avec succès. Vous pouvez vous connecter.',
          ),
        ),
      );

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => const LoginScreen(),
        ),
      );
    } catch (e) {
      if (!mounted) return;

      setState(() {
        errorMessage = e.toString().replaceFirst(
              'Exception: ',
              '',
            );
      });
    } finally {
      if (mounted) {
        setState(() {
          loading = false;
        });
      }
    }
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor:
          theme.colorScheme.surfaceContainerLowest,
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
                      borderRadius:
                          BorderRadius.circular(14),
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
                      borderRadius:
                          BorderRadius.circular(12),
                      border: Border.all(
                        color: theme.dividerColor,
                      ),
                    ),
                    child: Padding(
                      padding:
                          const EdgeInsets.all(24),
                      child: Column(
                        crossAxisAlignment:
                            CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Créer un compte',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight:
                                  FontWeight.bold,
                            ),
                          ),

                          const SizedBox(height: 6),

                          Text(
                            'Créez votre espace Task Manager.',
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
                                // Username
                                const Text(
                                  'Nom d’utilisateur',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight:
                                        FontWeight.w500,
                                  ),
                                ),

                                const SizedBox(height: 8),

                                TextFormField(
                                  controller:
                                      nameController,
                                  textInputAction:
                                      TextInputAction.next,
                                  decoration:
                                      const InputDecoration(
                                    hintText:
                                        'Votre nom',
                                    border:
                                        OutlineInputBorder(),
                                  ),
                                  validator: (value) {
                                    if (value == null ||
                                        value
                                            .trim()
                                            .isEmpty) {
                                      return 'Nom d’utilisateur obligatoire';
                                    }

                                    if (value.trim().length <
                                        2) {
                                      return 'Minimum 2 caractères';
                                    }

                                    return null;
                                  },
                                ),

                                const SizedBox(height: 20),

                                // Email
                                const Text(
                                  'Adresse email',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight:
                                        FontWeight.w500,
                                  ),
                                ),

                                const SizedBox(height: 8),

                                TextFormField(
                                  controller:
                                      emailController,
                                  keyboardType:
                                      TextInputType
                                          .emailAddress,
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
                                        value
                                            .trim()
                                            .isEmpty) {
                                      return 'Adresse email obligatoire';
                                    }

                                    if (!value
                                        .contains('@')) {
                                      return 'Adresse email invalide';
                                    }

                                    return null;
                                  },
                                ),

                                const SizedBox(height: 20),

                                // Password
                                const Text(
                                  'Mot de passe',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight:
                                        FontWeight.w500,
                                  ),
                                ),

                                const SizedBox(height: 8),

                                TextFormField(
                                  controller:
                                      passwordController,
                                  obscureText:
                                      obscurePassword,
                                  textInputAction:
                                      TextInputAction.next,
                                  decoration:
                                      InputDecoration(
                                    hintText:
                                        '••••••••',
                                    border:
                                        const OutlineInputBorder(),
                                    suffixIcon:
                                        IconButton(
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

                                    if (value.length <
                                        6) {
                                      return 'Minimum 6 caractères';
                                    }

                                    return null;
                                  },
                                ),

                                const SizedBox(height: 20),

                                // Confirm password
                                const Text(
                                  'Confirmer le mot de passe',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight:
                                        FontWeight.w500,
                                  ),
                                ),

                                const SizedBox(height: 8),

                                TextFormField(
                                  controller:
                                      confirmPasswordController,
                                  obscureText:
                                      obscureConfirmPassword,
                                  textInputAction:
                                      TextInputAction.done,
                                  onFieldSubmitted: (_) {
                                    if (!loading) {
                                      register();
                                    }
                                  },
                                  decoration:
                                      InputDecoration(
                                    hintText:
                                        '••••••••',
                                    border:
                                        const OutlineInputBorder(),
                                    suffixIcon:
                                        IconButton(
                                      onPressed: () {
                                        setState(() {
                                          obscureConfirmPassword =
                                              !obscureConfirmPassword;
                                        });
                                      },
                                      icon: Icon(
                                        obscureConfirmPassword
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
                                      return 'Confirmation obligatoire';
                                    }

                                    if (value !=
                                        passwordController
                                            .text) {
                                      return 'Les mots de passe ne correspondent pas';
                                    }

                                    return null;
                                  },
                                ),

                                // Error
                                if (errorMessage !=
                                    null) ...[
                                  const SizedBox(height: 16),
                                  Container(
                                    width:
                                        double.infinity,
                                    padding:
                                        const EdgeInsets
                                            .all(12),
                                    decoration:
                                        BoxDecoration(
                                      color: theme
                                          .colorScheme
                                          .errorContainer,
                                      borderRadius:
                                          BorderRadius
                                              .circular(8),
                                      border: Border.all(
                                        color: theme
                                            .colorScheme
                                            .error
                                            .withValues(
                                              alpha: 0.3,
                                            ),
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

                                // Register button
                                SizedBox(
                                  width: double.infinity,
                                  height: 48,
                                  child: ElevatedButton(
                                    onPressed:
                                        loading
                                            ? null
                                            : register,
                                    child: loading
                                        ? const SizedBox(
                                            width: 20,
                                            height: 20,
                                            child:
                                                CircularProgressIndicator(
                                              strokeWidth:
                                                  2,
                                            ),
                                          )
                                        : const Text(
                                            'Créer un compte',
                                            style:
                                                TextStyle(
                                              fontWeight:
                                                  FontWeight
                                                      .w600,
                                            ),
                                          ),
                                  ),
                                ),
                              ],
                            ),
                          ),

                          const SizedBox(height: 20),

                          // Login link
                          Center(
                            child: Wrap(
                              alignment:
                                  WrapAlignment.center,
                              children: [
                                Text(
                                  'Vous avez déjà un compte ? ',
                                  style: TextStyle(
                                    color: theme
                                        .colorScheme
                                        .onSurfaceVariant,
                                    fontSize: 14,
                                  ),
                                ),
                                GestureDetector(
                                  onTap: () {
                                    Navigator.pushReplacement(
                                      context,
                                      MaterialPageRoute(
                                        builder: (_) =>
                                            const LoginScreen(),
                                      ),
                                    );
                                  },
                                  child: Text(
                                    'Se connecter',
                                    style: TextStyle(
                                      color: theme
                                          .colorScheme
                                          .onSurface,
                                      fontSize: 14,
                                      fontWeight:
                                          FontWeight.w600,
                                      decoration:
                                          TextDecoration
                                              .underline,
                                      decorationThickness:
                                          1.5,
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