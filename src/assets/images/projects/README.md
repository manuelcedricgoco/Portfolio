# Project screenshots

Drop screenshots into the folder that matches the project's `slug` in `src/data/projects.ts`:

```
src/assets/images/projects/
├── sems/    ← School Event Management System
├── bms/     ← Barangay Management System
└── mtpms/   ← Mangrove & Tree Planting Monitoring System
```

That's all — **no code changes needed.** Images are discovered automatically.

- **Cover image:** the first file (sorted by name) is used on the project card and at the top of the case study.
- **Order and captions:** prefix files with numbers. The caption is built from the file name,
  so `02-event-calendar.webp` is shown as "Event calendar".
- **Formats:** `.webp`, `.avif`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`.
- **Size:** about 1600 px wide is plenty. Prefer `.webp` (usually 5–10× smaller than PNG).
  Convert quickly at https://squoosh.app or with `cwebp -q 82 in.png -o out.webp`.
- **Privacy:** crop or blur real names, addresses, contact numbers, and anything else personal
  before adding a screenshot — use demo data where you can.

Adding a new project? Create a folder named after its `slug` and add the project to `src/data/projects.ts`.
