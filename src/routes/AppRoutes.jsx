import { Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import HomePage from '../pages/HomePage'
import SnippetListPage from '../pages/SnippetListPage'
import SnippetFormPage from '../pages/SnippetFormPage'
import PrivateRoute from './PrivateRoute'
import UserDetailsPage from '../pages/UserDetailsPage'
import NotFoundPage from '../pages/NotFoundPage'
import SnippetDetailsPage from '../pages/SnippetDetailsPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/snippets' element={<SnippetListPage />} />
            <Route path='/user/:user_id' element={<UserDetailsPage />} />

            <Route path="/snippetForm" element={<PrivateRoute />}>
                <Route path="" element={<SnippetFormPage />} />
            </Route>
            <Route path="/snippetDetails/:snippet_id" element={<SnippetDetailsPage />} />
            {/* <Route path="/snippetDetails/:snippet_id" element={<PrivateRoute />}>
                <Route path="" element={<SnippetDetailsPage />} />
            </Route> */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>

    )
}

export default AppRoutes