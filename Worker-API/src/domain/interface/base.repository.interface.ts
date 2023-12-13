export interface IBaseRepository <T> {
    get(params: any): Promise<Object>
  
    store(data: any): Promise<T>
  
    update(params: any): Promise<T>
  
    delete(params: any): Promise<T>
}