import bcrypt from "bcryptjs";
import _ from "lodash";
import UUID from "uuid/v5";

const SALT_FACTOR: number = 10;

export async function hashPassword(password: string) {
    return new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
            bcrypt.hash(password, salt, (error, hashed) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(hashed);
                }
            });
        });
    });
}

export async function comparePassword(password: string, hash: string) {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, hash, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export function generateToken(min: number, max: number): number | string {
    if (_.isNaN(min) || _.isNaN(max)) {
        return 0;
    } else {
        return Math.floor(Math.random() * max) + min;
    }
}

export async function generateUUID(email: string, namespace = UUID.DNS) {
    return new Promise<string>((resolve, reject) => {
        const randomNumber: number = this.generateToken(10000000, 99999999);
        const scram = randomNumber + email + randomNumber;
        const UUIDGen = UUID(scram, namespace);
        if (UUIDGen) {
            resolve(UUIDGen);
        } else {
            reject(new Error("An error occurred while generating new UUID value"));
        }
    });
}

export function shortForRoles(name: string): string {
    const name_array = name.split(" ");
    let results = "";
    for (let item of name_array) {
        results += item.charAt(0).toLowerCase();
    }
    return results;
}
