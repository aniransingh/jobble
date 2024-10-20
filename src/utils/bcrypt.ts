import bcrypt from "bcryptjs";

// 1. encrypt (hash)
export async function hashValue(
    value: string,
    saltRounds: number = 10
): Promise<string> {
    return await bcrypt.hash(value, saltRounds);
}

// 2. decrypt and compare
export async function compareValue(
    value: string,
    hashedValue: string
): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue).catch(() => false);
}
