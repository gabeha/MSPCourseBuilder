import useSupabase from "./UseSupabase";
import { ref } from "vue"

const user = ref(null);

export default function useAuthUser() {
    const { supabase } = useSupabase()
    const login = async ({ email, password }) => {
        const { user, error } = await supabase.auth.signIn({ email, password })
        if (error) throw error
        console.log(user)
        return user
    }

    const loginWithRefreshToken = async (token) => {
        const login = async ({ email, password }) => {
            const { user, error } = await supabase.auth.signIn({ refreshToken: token })
            if (error) throw error
            return user
        }
    }
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        console.log('signed out succesfully')
    };
    const isLoggedIn = () => {
        return !!user.value
    };
    const register = async ({ email, password, ...meta }) => {
        const { user, error } = await supabase.auth.signUp(
            { email, password },
            {
                        data: meta,
                redirectTo: '${window.location.origin}/me?fromEmail=registrationConfirmation"',
            }
        );
        if (error) throw error;
        return user
    }
    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data);
        if (error) throw error
        return user
    }
    const sendPasswordRestEmail = async (email) => {
        const { user, error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) throw error
        return user
    }
    const maybeHandleEmailConfirmation = async (route)=>{}

    return {
        user,
        login,
        loginWithRefreshToken,
        isLoggedIn,
        logout,
        register,
        update,
        sendPasswordRestEmail,
        maybeHandleEmailConfirmation
    };
}