// Simple auth service for admin panel
const ADMIN_PASSWORD = "2011812"; // Admin access password

export const checkPassword = (password: string): boolean => {
    return password === ADMIN_PASSWORD;
};

export const isEditorAuthenticated = (): boolean => {
    const authToken = localStorage.getItem('editor_auth_token');
    const authTime = localStorage.getItem('editor_auth_time');

    if (!authToken || !authTime) return false;

    // Check if auth is still valid (24 hours)
    const authAge = Date.now() - parseInt(authTime);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (authAge > maxAge) {
        // Auth expired
        clearAuth();
        return false;
    }

    return authToken === btoa(ADMIN_PASSWORD);
};

export const setAuth = (password: string): boolean => {
    if (checkPassword(password)) {
        localStorage.setItem('editor_auth_token', btoa(password));
        localStorage.setItem('editor_auth_time', Date.now().toString());
        return true;
    }
    return false;
};

export const clearAuth = () => {
    localStorage.removeItem('editor_auth_token');
    localStorage.removeItem('editor_auth_time');
};

export const saveToGitHub = async (data: any, token?: string) => {
    // If you have a GitHub token, save to repo
    // For now, we'll save to localStorage and download as backup

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Auto-download backup
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${Date.now()}.json`;
    a.click();

    console.log('✅ Backup saved!');
    return true;
};
