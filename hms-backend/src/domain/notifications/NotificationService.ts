import { NotificationRequest } from "./NotificationRequest";

export class NotificationService {
  async send(req: NotificationRequest) {
    console.log("Sending notification:", {
      topic: req.getTopic(),
      to: req.getRecipientUserAccountId(),
      channels: [...req.getChannels()],
      data: [...req.getData().entries()]
    });
  }
}
