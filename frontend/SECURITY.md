# Security policy

## Report a vulnerability

Email [dhibi.ywsf@gmail.com](mailto:dhibi.ywsf@gmail.com) with the subject `Dashboard template security report`. This is the maintainer's public contact address.

Include the affected commit or dependency version, reproduction steps, expected behavior, and potential impact. A small proof of concept with synthetic data is useful. Do not include real credentials, personal data, or an exploit against someone else's deployment.

Do not disclose vulnerability details in public issues or pull requests before coordinating a fix. There is no guaranteed response time or paid bounty program.

## Supported code

Report issues against the current `main` branch. Older snapshots and downstream applications do not have a separate maintenance schedule. If you use this template in another project, you are responsible for updating its dependencies and applying relevant fixes.

## Demo authentication

This repository is a browser-based UI template. Its login accepts arbitrary nonempty credentials, and the Google button creates a local demo session. It does not perform real password verification or Google OAuth. The displayed accounts, metrics, and service states are sample data.

The session in localStorage and the client-side route guard are not authorization controls. Do not use them to protect private data. A production application needs server-validated sessions and server-side permission checks. Never store real passwords or access tokens in the demo session.

Treat stored values, imported data, and user input as untrusted. Reports about unsafe rendering, credential exposure, vulnerable dependencies, or unintended data access are welcome. The documented mock login behavior alone is not a production authentication guarantee.
