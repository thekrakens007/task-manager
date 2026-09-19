# Pages and demo behavior

The template uses one application shell for the routes below. Login is full-page and sits outside that shell. The sidebar groups pages by task, with the active group expanded automatically.

| Route                      | Page             | Try it                                                         |
| -------------------------- | ---------------- | -------------------------------------------------------------- |
| `/`                        | Dashboard        | Explore chart values and export the overview                   |
| `/operations`              | Operations       | Search for a failed job and return it to the queue             |
| `/users`                   | Users            | Filter the directory, open account details, and export results |
| `/analytics/users`         | User analytics   | Compare three or six months of registered users                |
| `/analytics/onboarding`    | Onboarding       | Review monthly completion rates                                |
| `/analytics/subscriptions` | Subscriptions    | Track paid membership growth                                   |
| `/analytics/processing`    | Processing       | Inspect completed job volume                                   |
| `/analytics/engagement`    | Engagement       | Compare monthly active users                                   |
| `/administrators`          | Administrators   | Prepare an invitation; duplicate email addresses are rejected  |
| `/roles`                   | Roles            | Open a role's full permission list                             |
| `/audit`                   | Audit log        | Search events, open details, and export the filtered list      |
| `/deletions`               | Deletion records | Inspect request history and export records                     |
| `/settings`                | Settings         | Save workspace details locally or reset unsaved changes        |
| `/account/security`        | Security         | Remove an example device after confirmation                    |
| `/login`                   | Login            | Enter any nonempty credentials or use the Google demo button   |

`/products` redirects to `/users` for older links. Unknown routes and unknown analytics report names display the not-found page.

## State and boundaries

The session and workspace profile persist in localStorage. Sidebar collapse uses a local preference cookie. Other changes last only while that page remains mounted. Reports and histories use fixed example data; they are not a record of actions you take in the demo.

Invitations do not send email. Retry updates a job's displayed queue status. Session removal changes the example device list and does not contact an authentication provider. Deletion records are read-only. Role descriptions do not enforce permissions.

Before connecting real data, replace the demo services and implement authorization on the server. Keep the page layout and shared components; replace the data and actions at the feature boundary. See [SECURITY.md](../SECURITY.md).
