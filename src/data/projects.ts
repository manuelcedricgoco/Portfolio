import type { Project, ProjectFilter } from './types';

/**
 * Add a project by appending an object here — cards, filters, the case-study page, and the
 * GitHub panel all read from this list. Everything below was checked against the repositories;
 * keep new entries just as factual (no invented roles, metrics, or users).
 *
 * Screenshots: put images in src/assets/images/projects/<slug>/ (see the README in that folder).
 * Sections the repositories cannot answer (role, challenges, what was learned) use neutral wording —
 * rewrite them in your own words whenever you like.
 */
export const projects: Project[] = [
  {
    slug: 'sems',
    shortTitle: 'SEMS',
    title: 'School Event Management System',
    type: 'Management System',
    visual: 'events',
    summary:
      'A web-based event management platform designed to organize school events, student participation, organizer workflows, and attendance tracking.',
    overview:
      'SEMS is a multi-role web platform for planning and running school events. Administrators approve and oversee events, organizers manage their own events and attendance, and students register, check in with a personal QR code, and share feedback. Dashboards and analytics give each role a clear view of participation.',
    categories: ['Web', 'Management Systems', 'Academic Projects'],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'QR Code', 'Chart.js', 'face-api.js'],
    highlights: [
      'QR-code attendance with time-in and time-out',
      'Separate admin, organizer, and student portals',
      'Analytics dashboards built with Chart.js',
    ],
    features: [
      'Student, organizer, and admin account management',
      'Event management with event types, venues, and an approval workflow',
      'Student registration and participation tracking for events',
      'QR attendance: students carry a personal QR code and organizers scan it at the event',
      'Login and logout (time-in and time-out) records for every attendee',
      'Proof-image check that compares scan photos with the student’s profile photo in the browser (face-api.js)',
      'Attendance monitoring and tracking views for organizers',
      'Dashboards for admins, organizers, and students',
      'Analytics and insight charts built with Chart.js',
      'Built-in messaging between students, organizers, and admins',
      'Event feedback and ratings from students',
      'Announcements, notifications, and organization, club, and department management',
    ],
    problem:
      'Schools run events across departments, clubs, and organizations. Without a shared system, approvals, registrations, and attendance are scattered across chats, forms, and spreadsheets, which makes participation hard to track and verify.',
    solution:
      'SEMS puts the whole event lifecycle in one place. Admins review and approve events, organizers run them and record attendance by scanning student QR codes, and students register, check in, and leave feedback. Dashboards and analytics turn those records into a clear picture of participation.',
    role: 'Developed as part of an academic/project initiative.',
    challenges: [
      'Serving three user roles with different permissions, navigation, and dashboards from one codebase.',
      'Keeping attendance trustworthy by combining QR scans, time-in and time-out records, and a proof-image check.',
      'Controlling who can see and join an event across departments, organizations, and clubs.',
    ],
    learned: [
      'Designing a relational schema for events, registrations, attendance, and feedback.',
      'Building role-based dashboards and charts with Chart.js.',
      'Working with QR codes and in-browser camera scanning.',
      'Organizing a growing PHP project into portal-specific pages, shared includes, and per-page JavaScript.',
    ],
    github: 'https://github.com/manuelcedricgoco/SEMS',
  },
  {
    slug: 'bms',
    shortTitle: 'BMS',
    title: 'Barangay Management System',
    type: 'Management System',
    visual: 'dashboard',
    summary:
      'A modern barangay management platform designed to centralize resident records, community services, document processing, announcements, requests, and administrative operations.',
    overview:
      'BMS is a PHP and MySQL/MariaDB portal that brings a barangay’s day-to-day records into one place: residents and households, certificate and assistance requests, incidents and blotter cases, disaster and evacuation data, business permits, announcements, and more. A dashboard with live charts and exportable reports keeps staff informed.',
    categories: ['Web', 'Management Systems'],
    technologies: ['PHP', 'MySQL / MariaDB', 'Tailwind CSS', 'JavaScript', 'Chart.js', 'SweetAlert2'],
    highlights: [
      'Resident, household, and purok records',
      'Certificate and assistance request pipelines',
      'Audit logs, login activity, and permission checks',
    ],
    features: [
      'Resident management with detailed profile pages',
      'Household and purok management',
      'Certificate requests with a status pipeline and printable certificates',
      'Assistance records that move from pending to approved to distributed',
      'Announcements with a draft, publish, and unpublish workflow',
      'Events and barangay officials management',
      'User and role management with level-based permissions',
      'Audit logs and login activity tracking',
      'Incident reports and blotter cases with hearing schedules',
      'Disaster records, evacuation centers, and evacuation check-in and check-out',
      'Business permit tracking and facilities management',
      'Dashboard with Chart.js charts, plus CSV, Excel, and PDF report exports',
      'Citizen portal for registration, profile, and certificate requests',
      'In-app notifications and global search',
    ],
    security: [
      'PDO prepared statements throughout',
      'Password hashing with password_hash() and password_verify()',
      'CSRF tokens on state-changing forms',
      'Session hardening: HttpOnly cookies and session regeneration on login',
      'Server-side permission checks on every write action',
      'Login rate limiting per username and IP address',
    ],
    problem:
      'A barangay office handles resident records, certificate requests, assistance programs, incidents, and announcements, often across paper logs and separate spreadsheets. Staff need one place to keep records consistent, move requests through approval, and see who changed what.',
    solution:
      'BMS centralizes these workflows in a single role-based portal. Staff manage residents, households, and puroks; process certificate and assistance requests through defined status steps; log incidents, blotter cases, and disaster data; and publish announcements and events, with audit logs and permission checks keeping every action accountable.',
    role: 'Developed as part of an academic/project initiative.',
    challenges: [
      'Keeping every module consistent with one repeatable pattern for validation, permissions, audit logging, and feedback messages.',
      'Enforcing valid status transitions so certificate and assistance requests cannot skip stages.',
      'Protecting data integrity with transactions, unique constraints, and dependency checks before deleting linked records.',
      'Adding permission checks on top of an existing database schema by using role levels instead of a new permissions table.',
    ],
    learned: [
      'Treating server-side validation and permission checks as the real security boundary, not hidden buttons.',
      'Structuring a modular PHP application around one repeatable module pattern.',
      'Database integrity: transactions, unique constraints, and safe deletes.',
      'Compiling Tailwind locally so pages render reliably even without internet access.',
    ],
    github: 'https://github.com/manuelcedricgoco/BMS',
  },
  {
    slug: 'mtpms',
    shortTitle: 'MTPMS',
    title: 'Mangrove & Tree Planting Monitoring System',
    type: 'Monitoring System',
    visual: 'map',
    summary:
      'A web-based environmental monitoring platform designed to coordinate tree planting activities, track planting records, monitor survival, and support environmental reporting.',
    overview:
      'MTPMS is a PHP and MySQL system for running mangrove and tree-planting programs. Administrators manage sites, species, events, and monitoring; volunteers log GPS-tagged planting records and join events; and citizens can report illegal cutting with photo evidence and a map location. Dashboards, maps, and exportable reports support environmental reporting.',
    categories: ['Web', 'Monitoring Systems', 'Academic Projects'],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Chart.js', 'Leaflet', 'QR Code'],
    highlights: [
      'GPS-tagged planting records on interactive maps',
      'Survival monitoring by site and species',
      'Illegal-cutting reports with photo evidence',
    ],
    features: [
      'Admin, volunteer, and citizen portals with role-based access',
      'Planting sites and tree species management, including GPS coordinates',
      'Volunteer planting records with coordinates, photos, and a verification step',
      'Survival monitoring: healthy, dead, and missing counts, growth stage, and survival rate',
      'Interactive Leaflet maps',
      'Volunteer events with registration, participation tracking, and QR-code check-in',
      'Citizen reports of illegal cutting with photo evidence and GPS location',
      'Report workflow with status history and volunteer assignment',
      'Admin dashboard with Chart.js analytics',
      'Reports with CSV export and print-to-PDF',
      'Account approval workflow, login activity, and activity logs',
      'Database backup and restore tools for administrators',
    ],
    security: [
      'PDO prepared statements everywhere',
      'Password hashing with password_hash() and password_verify()',
      'CSRF tokens on state-changing actions',
      'Session hardening: HttpOnly and SameSite cookies, regeneration on login, idle timeout',
      'Role-based access checks on every protected page',
      'Database-backed rate limiting on login, registration, and other sensitive actions',
      'Secure uploads with MIME-type sniffing and random file names',
    ],
    problem:
      'Tree-planting programs produce scattered information: where seedlings were planted, which ones survived, who took part, and where illegal cutting is happening. Without a shared system it is hard to coordinate volunteers and report on results.',
    solution:
      'MTPMS gives administrators, volunteers, and citizens separate portals on one database. Admins manage sites, species, events, and monitoring; volunteers log GPS-tagged planting records and survival checks; citizens report illegal cutting with photo evidence and a map location. Dashboards, maps, and exportable reports turn the records into environmental reporting.',
    role: 'Developed as part of an academic/project initiative.',
    challenges: [
      'Handling location data end to end: capturing coordinates, storing them, and plotting them on maps.',
      'Designing three role-specific portals with approval workflows and server-side access control.',
      'Making a PHP and XAMPP deployment safer with environment-based credentials, rate limiting, secure uploads, and backups.',
    ],
    learned: [
      'Working with GPS coordinates and Leaflet maps.',
      'Role-based access and account approval workflows.',
      'Database-backed rate limiting and backup tooling in plain PHP.',
    ],
    github: 'https://github.com/manuelcedricgoco/Mangrove-and-Tree-Planting-Monitoring-System',
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Previous / next project for the case-study footer (wraps around). */
export function getAdjacentProjects(slug: string): { prev: Project; next: Project } | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return undefined;
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

export function filterProjects(filter: ProjectFilter): Project[] {
  return filter === 'All' ? projects : projects.filter((project) => project.categories.includes(filter));
}

/** Repository name from a GitHub URL, e.g. "SEMS". */
export function repoName(project: Pick<Project, 'github'>): string {
  return project.github.split('/').filter(Boolean).pop() ?? project.github;
}
