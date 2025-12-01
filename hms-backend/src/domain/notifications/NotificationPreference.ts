import { UUID } from "../common/types";
import { NotificationChannel, NotificationTopic } from "../common/enums";

export class NotificationPreference {
  constructor(
    private userAccountId: UUID,
    private topic: NotificationTopic,
    private channels: Set<NotificationChannel>,
    private enabled: boolean = true,
    private quietStart: string | null = null,
    private quietEnd: string | null = null
  ) {}

  getUserAccountId(): UUID { return this.userAccountId; }
  getTopic(): NotificationTopic { return this.topic; }
  getChannels(): Set<NotificationChannel> { return new Set(this.channels); }
  isEnabled(): boolean { return this.enabled; }
}
