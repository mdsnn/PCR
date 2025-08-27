export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

export interface PageProps<T extends Record<string, unknown> = Record<string, unknown>> {
    auth: {
        user: User | null;
    };
    flash: {
        message?: string;
        error?: string;
    };
}

export interface AuthPageProps extends PageProps {
    errors: Record<string, string>;
}
