import { Category } from 'src/category/domain';
import { List } from 'src/list/domain';
import { Tag } from 'src/tag/domain';
import { TagsOnTask } from 'src/tags-on-task/domain';
import { Task } from 'src/task/domain';
import { UserAchievement } from 'src/user-achievement/domain';
import { Notification } from 'src/notification/domain';

export class SyncDTO {
  categories!: Array<Category>;
  lists!: Array<List>;
  tags!: Array<Tag>;
  tasks!: Array<Task>;
  tagsOnTask!: Array<TagsOnTask>;
  userAchievements!: Array<UserAchievement>;
  notifications!: Array<Notification>;
}
