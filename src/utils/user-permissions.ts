import { User, UserRole } from '../models/user';

// Define default permissions for each role
export const defaultPermissions = {
    [UserRole.OWNER]: [
        'create-hotel',
        'read-hotel',
        'update-hotel',
        'delete-hotel',
        'invite-hotel',
    ],
    [UserRole.ADMIN]: ['read-profile', 'update-profile'],
    [UserRole.MANAGER]: ['read-profile', 'update-profile'],
    [UserRole.FRONT_DESK]: ['read-profile', 'update-profile'],
    [UserRole.BAR_MANAGER]: ['read-profile', 'update-profile'],
    [UserRole.DEVELOPER]: ['read-profile', 'update-profile'],
};

export const grantPermissions = (user: User, permissions: string[]): void => {
    // Ensure 'user.permissions' is defined and initialize it if needed
    if (user.permissions === undefined) {
        user.permissions = []; // Initialize with an empty array
    }
    // Add each permission to the user's permissions array
    permissions.forEach((permission) => {
        user.permissions.push(permission);
    });
};

export const hasPermissions = (
    user: User,
    requiredPermissions: string[]
): boolean => {
    if (!user || user.permissions === undefined) {
        return false;
    }

    const userPermissions = user.permissions;

    // Check if all required permissions are present in userPermissions
    return requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
    );
};

export const checkPermissions = (requiredPermissions: string[]) => {
    return (req, res, next) => {
        const user = req.user; // Assuming the authenticated user is stored in the request object

        if (!hasPermissions(user, requiredPermissions)) {
            return res
                .status(403)
                .json({ message: 'Insufficient permissions' });
        }

        next(); // User has the required permissions, proceed to the route handler
    };
};

export const revokePermissionsFromUser = (
    user: User,
    permissions: string[]
): void => {
    if (user.permissions === undefined) {
        // If user.permissions is undefined, there are no permissions to revoke.
        return;
    }

    permissions.forEach((permission) => {
        user.permissions = user.permissions.filter((p) => p !== permission);
    });
};
