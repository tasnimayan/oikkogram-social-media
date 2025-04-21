export default function EmailResponse(type: string) {
  let notificationType: string;
  switch (type) {
    case "new_friend":
      notificationType = "new friend request";
    case "new_message":
      notificationType = "new message";
    default:
      notificationType = "new notification";
  }

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Notification Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border: 1px solid #dddddd;
              padding: 20px;
          }
          .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 10px;
              text-align: center;
          }
          .content {
              margin: 20px 0;
              text-align: center;
          }
          .footer {
              text-align: center;
              font-size: 12px;
              color: #aaaaaa;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Buddybase</h1>
          </div>
          <div class="content">
              <p>You have a ${notificationType}.</p>
          </div>
          <div class="footer">
              <p>&copy; 2024 Buddybase. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;
}
