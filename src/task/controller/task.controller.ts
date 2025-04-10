import { Controller, Get, Post, Request } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Task } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertTasks(@Request() req): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.taskService.insertTasks(req.body);
  }

  @Get()
  async getTasks(@Request() req): Promise<Array<Task>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const token: string = req.headers.authorization as string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = await this.jwtDecodeService.decodeToken(token);
    console.log(obj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.taskService.getTasks(obj.id);
  }
}
