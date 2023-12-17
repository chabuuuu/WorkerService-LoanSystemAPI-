import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";

const jwt = require('jsonwebtoken');

// Middleware kiểm tra JWT
export function authenticateJWT(req: any, res: any, next: any) {
    
    const token = req.header('Authorization');
    console.log(token);
    try {
        if (!token) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
            // return res.status(401).json({ message: 'Không có JWT' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
            if (err) {
                console.log(err);

                throw err
                // return res.status(403).json({ message: 'JWT không hợp lệ' });
            }
            req.user = user;
            next();
        });
    } catch (error: any) {
        next(error);
    }
}
