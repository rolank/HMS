import { UUID } from "../common/types";
import { NotificationChannel, NotificationTopic } from "../common/enums";

export class NotificationRequest {
  constructor(
    private idempotencyKey: string,
    private topic: NotificationTopic,
    private recipientUserAccountId: UUID,
    private channels: Set<NotificationChannel>,
    private data: Map<string, string>
  ) {}

  getIdempotencyKey() { return this.idempotencyKey; }
  getTopic() { return this.topic; }
  getRecipientUserAccountId() { return this.recipientUserAccountId; }
  getChannels() { return new Set(this.channels); }
  getData() { return new Map(this.data); }
}
