import { Inject, Injectable } from '@nestjs/common';
import { DrizzleRemindMe } from 'src/db/database.module';
import { DB_INJECTION_KEY } from 'src/db/utils';
import { Category } from 'src/category/domain';
import { List } from 'src/list/domain';
import { Tag } from 'src/tag/domain';
import { TagsOnTask } from 'src/tags-on-task/domain';
import { Task } from 'src/task/domain';
import { UserAchievement } from 'src/user-achievement/domain';
import { Notification } from 'src/notification/domain';
import { CategoryService } from 'src/category/service/category.service';
import { ListService } from 'src/list/service/list.service';
import { TagService } from 'src/tag/service/tag.service';
import { TaskService } from 'src/task/service/task.service';
import { TagsOnTaskService } from 'src/tags-on-task/service/tags-on-task.service';
import { NotificationService } from 'src/notification/service/notification.service';
import { UserAchievementService } from 'src/user-achievement/service/user-achievement.service';

export type SyncProps = {
  categories: Array<Category>;
  lists: Array<List>;
  tags: Array<Tag>;
  tasks: Array<Task>;
  tagsOnTask: Array<TagsOnTask>;
  userAchievements: Array<UserAchievement>;
  notifications: Array<Notification>;
};

@Injectable()
export class SyncService {
  constructor(
    @Inject(DB_INJECTION_KEY)
    private readonly db: DrizzleRemindMe,
    private categoryService: CategoryService,
    private listService: ListService,
    private tagService: TagService,
    private taskService: TaskService,
    private tagOnTaskService: TagsOnTaskService,
    private userAchievementsService: UserAchievementService,
    private notificationService: NotificationService,
  ) {}

  async getData(userId: number): Promise<SyncProps> {
    return await this.db.transaction(async () => {
      return {
        categories: await this.categoryService.getCategories(userId),
        lists: await this.listService.getLists(userId),
        tags: await this.tagService.getTags(userId),
        tasks: await this.taskService.getTasks(userId),
        tagsOnTask: await this.tagOnTaskService.getTagsOnTasks(userId),
        userAchievements:
          await this.userAchievementsService.getUserAchievements(userId),
        notifications: await this.notificationService.getNotifications(userId),
      };
    });
  }

  async insertData(data: SyncProps): Promise<void> {
    return await this.db.transaction(async () => {
      await this.notificationService.deleteNotifications(
        data.notifications[0].userId,
      );
      await this.userAchievementsService.deleteUserAchievements(
        data.userAchievements[0].userId,
      );
      await this.tagOnTaskService.deleteTagsOnTasks(
        data.tagsOnTask[0].taskUserId,
      );
      await this.taskService.deleteTasks(data.tasks[0].userId);
      await this.tagService.deleteTags(data.tags[0].userId);
      await this.listService.deleteLists(data.lists[0].userId);
      await this.categoryService.deleteCategories(data.categories[0].userId);

      await this.categoryService.insertCategories(data.categories);
      await this.listService.insertLists(data.lists);
      await this.tagService.insertTags(data.tags);
      await this.taskService.insertTasks(data.tasks);
      await this.tagOnTaskService.insertTagsOnTasks(data.tagsOnTask);
      await this.userAchievementsService.insertUserAchievements(
        data.userAchievements,
      );
      await this.notificationService.insertNotifications(data.notifications);
    });
  }
}
