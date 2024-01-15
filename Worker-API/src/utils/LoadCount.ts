export class Load_Count{
    static count = 0;
    getCosumers(): string {
        // if (Load_Count.count > 10){
        //     Load_Count.count = 1;
        // }
        // if (Load_Count.count <= 3){
        //     return 'A';
        // }
        // else{
        //     return 'B';
        // }
        if (Load_Count.count % 2 == 0){
            return 'A';
        }
        else{
            return 'B';
        }
    }
    increase(){
        Load_Count.count++;
    }
}