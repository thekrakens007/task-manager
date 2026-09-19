import 'package:flutter_test/flutter_test.dart';

import 'package:mobile/main.dart';

void main() {
  testWidgets('Task Manager démarre correctement', (tester) async {
    await tester.pumpWidget(const TaskManagerApp());

    expect(find.text('Task Manager'), findsOneWidget);
  });
}