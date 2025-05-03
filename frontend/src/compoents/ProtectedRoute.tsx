import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth.context'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const router = useNavigate()
    const [loading, setLoading] = useState(true)
    const { profileUser } = useAuth()

    useEffect(() => {
        const token = localStorage.getItem("token") || ''
        if (token) {
            // Fetch user profile only if token exists
            profileUser(token)
                .then(() => setLoading(false))  // Set loading false after user profile is fetched
                .catch(() => {
                    setLoading(false)  // In case of error, stop loading
                    router("/auth/login")  // Redirect to login if error occurs
                })
        } else {
            setLoading(false)
            router("/auth/login")
        }
    }, [profileUser, router])  // Add profileUser and router to dependencies to avoid stale closures

    if (loading) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default ProtectedRoute
