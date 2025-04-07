import { Controller, Get, Post, Request } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../domain';

@Controller('Notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  async insertNotifications(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.notificationService.insertNotifications(req.body);
  }

  @Get()
  async getNotifications(@Request() req): Promise<Array<Notification>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.notificationService.getNotifications(req.user.id);
  }
}
