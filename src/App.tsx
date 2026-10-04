import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PageSkeleton } from '@/components/PageSkeleton';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastProvider } from '@/components/ToastProvider';
import { MotionProvider } from '@/lib/motion';
import { loadProjectDetails } from '@/lib/routes';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import { routerBasename } from '@/utils/site';

// The case-study page is code-split: it only loads when someone opens a project.
const ProjectDetails = lazy(loadProjectDetails);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'projects/:slug',
          element: (
            <Suspense fallback={<PageSkeleton />}>
              <ProjectDetails />
            </Suspense>
          ),
        },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: routerBasename },
);

export default function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
