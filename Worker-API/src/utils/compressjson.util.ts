import { HttpException, HttpStatus } from "@nestjs/common";
import { compress } from 'compress-json'
import { jsonCompress_config } from "src/configs/config.jsoncompress";
// Middleware kiểm tra JWT
export function CompressJson(req: any, res: any, next: any) {
    console.log("Compress?: " + jsonCompress_config.enable);
    
    if (jsonCompress_config.enable == true){
    var send = res.send;
    res.send = function (body) { 
        try {
            let compressed = JSON.stringify(compress(JSON.parse(body)))
            console.log("Complete compress JSON Respond!");
            send.call(this, compressed);
        } catch (error) {
            next(new HttpException('Compress JSON reponse failed!', HttpStatus.SERVICE_UNAVAILABLE))
        } 
    };
    }
    next();
}
