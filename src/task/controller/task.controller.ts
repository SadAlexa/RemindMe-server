import { Controller, Get, Post, Request } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Task } from '../domain';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async insertTasks(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.taskService.insertTasks(req.body);
  }

  @Get()
  async getTasks(@Request() req): Promise<Array<Task>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.taskService.getTasks(req.user.id);
  }
}
