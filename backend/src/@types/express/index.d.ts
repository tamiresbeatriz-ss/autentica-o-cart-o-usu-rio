import { Request } from 'express';

declare namespace Express{
    export interface Request{
        user_id: string;
    }
}