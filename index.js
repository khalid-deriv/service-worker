const check = () => {
	if (!("serviceWorker" in navigator)) {
		throw new Error("No Service Worker support!");
	}
	if (!("PushManager" in window)) {
		throw new Error("No Push API Support!");
	}
};

const registerServiceWorker = async () => {
	const swRegistration = await navigator.serviceWorker.register(
		"push-worker.js"
	);
	return swRegistration;
};

const requestNotificationPermission = async () => {
	const permission = await window.Notification.requestPermission();
	// value of permission can be 'granted', 'default', 'denied'
	// granted: user has accepted the request
	// default: user has dismissed the notification permission popup by clicking on x
	// denied: user has denied the request.
	if (permission !== "granted") {
		throw new Error("Permission not granted for Notification");
	}
	console.log(permission);
};

const main = async () => {
	check();
	const swRegistration = await registerServiceWorker();
	const permission = await requestNotificationPermission();
};

document.getElementById("permission-btn").addEventListener("click", main);

// const requestNotificationPermission = async () => {
//     const permission = await window.Notification.requestPermission();
//     // value of permission can be 'granted', 'default', 'denied'
//     // granted: user has accepted the request
//     // default: user has dismissed the notification permission popup by clicking on x
//     // denied: user has denied the request.
//     if (permission !== "granted") {
//         throw new Error("Permission not granted for Notification");
//     }
//     return permission;
// };

// const showLocalNotification = (title, body, swRegistration) => {
//     const options = {
//         body,
//         // here you can add more properties like icon, image, vibrate, etc.
//     };
//     swRegistration.showNotification(title, options);
// };

// const registerSW = async () => {
//     let swRegistration;
//     if ("serviceWorker" in navigator) {
//         console.log(
//             "CLIENT: service worker registration in progress."
//         );
//         swRegistration = await navigator.serviceWorker.register(
//             "service-worker.js"
//         );
//         // .then(
//         // 	function () {
//         // 		console.log(
//         // 			"CLIENT: service worker registration complete."
//         // 		);
//         // 	},
//         // 	function () {
//         // 		console.log(
//         // 			"CLIENT: service worker registration failure."
//         // 		);
//         // 	}
//         // );
//         // swRegistration.showNotification("Test", "test text body");
//     } else {
//         console.log("CLIENT: service worker is not supported.");
//     }

//     return swRegistration;
// };

// const main = async () => {
//     const swRegistration = await registerSW();
//     const permission = await requestNotificationPermission();
//     console.log(permission);

//     showLocalNotification(
//         "This is title",
//         "this is the message",
//         swRegistration
//     );
// };

// main();
