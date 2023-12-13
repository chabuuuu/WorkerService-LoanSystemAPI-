import { Type } from "@nestjs/common";
import { IBaseRepository } from "src/domain/interface/base.repository.interface";
import { IBaseService } from "src/domain/interface/base.service.interface";

export class BaseService<T extends any, R extends IBaseRepository<T> > implements IBaseService<T>{
    protected readonly repository: R
    constructor (repository: R){
        this.repository = repository;
    }
    get(params: any): Promise<Object> {
        return this.repository.get(params);
    }
    store(data: any): Promise<T> {
        return this.repository.store(data);
    }
    update(params: any): Promise<T> {
        return this.repository.update(params);
    }
    delete(params: any): Promise<T> {
        return this.repository.delete(params);
    }

}