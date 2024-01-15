import { ApiProperty } from "@nestjs/swagger";

export class ScheduleDTO{
    @ApiProperty()
    job: string
    @ApiProperty()
    time: string
    @ApiProperty()
    content: string
    @ApiProperty()
    scheduled: boolean
    @ApiProperty()
    adminId: string
}