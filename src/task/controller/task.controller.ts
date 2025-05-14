import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Task } from '../domain';
import { JwtDecodeService } from 'src/utils/jwt-decode.service';
import { TaskDTO } from '../dto/tasks.dto';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  @Post()
  async insertTasks(@Body() tasksDTO: Array<TaskDTO>): Promise<void> {
    await this.taskService.insertTasks(tasksDTO);
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
