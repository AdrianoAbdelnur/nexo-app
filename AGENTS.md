# AGENTS.md

## Project

Field technician mobile app built with Expo, React Native, and Expo Router for agenda management, task execution, guided evidence capture, GPS tracking during active work, and synchronization with the web operations panel.
It consumes APIs from the `nexo` web panel and follows the workflow defined in `docs/Documento-de-Inicio-de-Proyecto.md` from the web project.

## Related Projects

- Mobile app (React Native / Expo): `D:\CopiaD\backUp\Proyectos App\nexoApp`
- This web panel (Next.js): `D:\CopiaD\backUp\Proyectos Web\nexo`

## How To Work

- Before touching code, first explain what is proposed, how it will be done, and where.
- Do not modify any code until the user explicitly approves the proposed plan.
- Make minimal, clear, and easy-to-verify changes.
- Do not refactor unrelated parts.
- Move in stages, prioritizing small changes.

## Rules

- Use TypeScript where applicable.
- Do not add libraries unless truly necessary.
- Do not duplicate logic.
- Do not use hacks.
- Do not leave dead code.
- Do not break existing API contracts with the web panel.
- Always follow `D:\CopiaD\backUp\Proyectos Web\nexo\docs\Guia-Visual-UI.md` when generating or refactoring any UI, screen, component, empty state, or navigation surface.
- Never commit or push directly to `main`.
- Before any commit, run the relevant validation command and ensure it finishes successfully.
- Never commit if validation fails.
- Do not run full validation/build for every tiny change (copy/text/minor style tweaks). Run validations after substantial changes and always before commit.

## Structure

- `app`: Expo Router screens and route groups
- `components`: reusable UI pieces
- `constants`: shared app constants
- `hooks`: React hooks and app logic helpers
- `assets`: images, icons, and static files
- `scripts`: maintenance and project tooling

## UI System

- Use the shared visual reference from the web project as the source of truth.
- Keep the same blue, slate, and white identity, but adapt density for mobile use.
- Favor clear cards, strong hierarchy, readable labels, and restrained shadows.
- Match the operational dashboard tone, not a playful consumer app style.

## Main Modules

1. Authentication and session (`app/(auth)`, session persistence, sign-in flow)
2. Agenda and task list (`app/(tabs)`, daily schedule, task status views)
3. Task detail and execution (`task detail`, arrival confirmation, start/end flow)
4. Evidence capture (`photos`, checklists, observations, upload queue)
5. Navigation and location (`maps`, directions, GPS tracking during active tasks)
6. Synchronization and offline handling (`pending uploads`, retry queue, sync status)
7. Settings and support (`profile`, app settings, diagnostics)

## App <-> Web Contract (Critical)

- Keep stable:
  - JWT payload (`user.id`, `user.role`)
  - task and execution states shared with the web panel
  - task item structure by vehicle
  - evidence upload payloads and metadata
  - live GPS and activity payloads while a task is active
- If an endpoint/payload used by the web panel changes, update the web side and document migration.

## Environment Variables

- `EXPO_PUBLIC_API_URL` (required)
- `EXPO_PUBLIC_GOOGLE_MAPS_KEY` or equivalent map key used by the app
- Any auth/session secret is expected to be handled by the backend, not hardcoded in the app

## Backend/API

- Validate inputs before sending requests.
- Do not leak sensitive data (tokens, secrets, private URLs) in logs.
- Keep consistent response handling for `ok`, `error`, `message`, `items`, and `item`.

## Validation

- Review types.
- Review imports.
- Verify main flow.
- Report touched files and what to test.
- Test affected screens and flows on the relevant platform(s) when possible.

## Useful Commands

- `npm run start`
- `npm run android`
- `npm run ios`
- `npm run web`
- `npm run lint`

## Branch Discipline

When changing work topic (feature/bugfix/chore area), switch to a branch that matches the new topic before making any commit.

Mandatory flow:
1. Check current branch status first.
2. If there are pending local changes (not committed or not pushed), do not switch branch automatically.
3. In that case, stop and ask the user how to proceed.
4. Only switch branch when the current branch is clean (no pending commit/push work).
5. Create a new branch or checkout an existing matching branch.
6. Confirm branch name matches the new topic.
7. Only then stage, commit, and push.

Never keep committing unrelated topics to the same long-lived branch.
Never change branch while there are pending changes unless the user explicitly approves the action.

