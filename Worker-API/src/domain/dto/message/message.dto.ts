import { ApiProperty } from "@nestjs/swagger";

export class MessageDTO {
    //id: Admin['id'];
    @ApiProperty()
    message: string;
    @ApiProperty()
    sender_id: number;
    @ApiProperty()
    nameExchange: number;
    @ApiProperty()
    send_type: string;
    @ApiProperty()
    send_count: number;
  }