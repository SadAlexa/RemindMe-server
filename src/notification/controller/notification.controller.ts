import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { NotificationDTO } from '../dto/notifications.dto';

@Controller('Notification')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertNotifications(
    @Body() notificationsDTO: Array<NotificationDTO>,
  ): Promise<void> {
    await this.notificationService.insertNotifications(notificationsDTO);
  }

  @Get()
  async getNotifications(@Request() req): Promise<Array<Notification>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.notificationService.getNotifications(obj.id);
  }
}
