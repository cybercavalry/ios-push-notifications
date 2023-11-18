self.addEventListener("push", async (event) => {
  const { title, body } = await event.data.json();
  console.log(title, body);
  self.registration.showNotification(title, // title of the notification
  {
      body: "Push notification from section.io", //the body of the push notification
      image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
      icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon 
  });
});
