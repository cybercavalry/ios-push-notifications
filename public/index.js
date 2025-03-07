async function run() {
  // A service worker must be registered in order to send notifications on iOS
  const registration = await navigator.serviceWorker.register(
    "serviceworker.js",
    {
      scope: "./",
    }
  );

  const button = document.getElementById("subscribe");

  const areNotificationsGranted = window.Notification.permission === "granted";
  if (areNotificationsGranted) {
    button.innerText = "Send Notification";

    button.addEventListener("click", async () => {
      await fetch("/send-notification");
    });
  } else {
    button.addEventListener("click", async () => {
      // Triggers popup to request access to send notifications
      const result = await window.Notification.requestPermission();

      // If the user rejects the permission result will be "denied"
      if (result === "granted") {
        const subscription = await registration.pushManager.subscribe({
          // TODO: Replace with your public vapid key
          applicationServerKey:
            "BKJxJ4VCbhqzjiC07nU80kX7K9_SU-hNBWhWhj-HKqR584BXkqC_pvzXCccQa7YUbp7lEQ0XqAFbvV6TT08Qu2M",
          userVisibleOnly: true,
        });

        console.log(subscription);

        await fetch("/save-subscription", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        });

        window.location.reload();
      }
    });
  }
}

run();
