import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoginGuard } from './guards/authLogin.guard';


export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component'),
        canActivate: [AuthLoginGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        canActivate: [AuthGuard],
        children: [
            {
                path: 'change-detection',
                title: 'Change Detection',
                loadComponent: () => import('./dashboard/pages/change-detection/change-detection.component')
            },
            {
                path: 'control-flow',
                title: 'Control Flow',
                loadComponent: () => import('./dashboard/pages/control-flow/control-flow.component')
            },
            {
                path: 'defer-options',
                title: 'Defer Options',
                loadComponent: () => import('./dashboard/pages/defer-options/defer-options.component')
            },
            {
                path: 'defer-views',
                title: 'Defer Views',
                loadComponent: () => import('./dashboard/pages/defer-views/defer-views.component')
            },
            {
                path: 'user/:id',
                title: 'User View',
                loadComponent: () => import('./dashboard/pages/user/user.component')
            },
            {
                path: 'users-list',
                title: 'User List',
                loadComponent: () => import('./dashboard/pages/users/users.component')
            },
            {
                path: 'view-transition',
                title: 'View Transition',
                loadComponent: () => import('./dashboard/pages/view-transition/view-transition.component')
            },
            {
                path: 'calendar',
                title: 'Calendar',
                loadComponent: () => import('./shared/calendar/calendar.component')
            },
            {
                path: 'full-calendar',
                title: 'FullCalendar',
                loadComponent: () => import('./shared/calendar/fullcalendar/fullcalendar.component')
            },
            {
                path: '',
                redirectTo: 'control-flow',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }

];
