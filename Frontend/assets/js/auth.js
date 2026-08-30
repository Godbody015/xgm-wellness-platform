/*==================================================
XGM WELLNESS
AUTH.JS — handles signup, login, logout, and session
using Supabase Auth, linked to the `customers` table
==================================================*/

// ---------- SIGN UP ----------
async function signUp(email, password, fullName, phone = "") {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        console.error("XGM: signup failed", error);
        return { success: false, message: error.message };
    }

    // Create a matching row in the customers table
    const { error: insertError } = await supabase
        .from("customers")
        .insert([{
            id: data.user.id,
            full_name: fullName,
            email: email,
            phone: phone
        }]);

    if (insertError) {
        console.error("XGM: failed to save customer profile", insertError);
        return { success: false, message: "Account created, but profile setup failed." };
    }

    return { success: true, message: "Account created! Please check your email to confirm." };
}

// ---------- LOG IN ----------
async function logIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("XGM: login failed", error);
        return { success: false, message: "Incorrect email or password." };
    }

    return { success: true, message: "Logged in successfully." };
}

// ---------- LOG OUT ----------
async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("XGM: logout failed", error);
        return { success: false };
    }
    window.location.href = "index.html";
    return { success: true };
}

// ---------- CHECK LOGIN STATUS ----------
async function getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? session.user : null;
}

// ---------- UPDATE NAV BAR BASED ON LOGIN STATUS ----------
async function updateAuthUI() {
    const user = await getCurrentUser();
    const accountIcon = document.querySelector(".account-icon, #account-icon");
    if (!accountIcon) return;

    if (user) {
        accountIcon.setAttribute("href", "account.html");
        accountIcon.setAttribute("title", "My Account");
    } else {
        accountIcon.setAttribute("href", "login.html");
        accountIcon.setAttribute("title", "Log In");
    }
}

document.addEventListener("DOMContentLoaded", updateAuthUI);
