# Screen Time Tracker

Tracking the time users spend on each screen is essential nowadays. This library makes it easy to measure how long users spend on each page.

## Install

```npm
npm install screen-time-tracker
```

# Usage

```bash
 screen-time-tracker
```

# Contributing

If you want to contribute by adding or improving something, you're welcome to collaborate directly in this repository: [screen-time-tracker](https://github.com/TatanLion/screen-time-tracker)

# License

Screen Time Tracker is released under the [MIT License](https://opensource.org/licenses/MIT).

# Instructions to Use

This library helps you save data in the IndexedDB for each page you visit. If the page is minimized or not visible, the tracking pauses and saves the time. You can view the saved records in the browser's IndexedDB. The structure is as follows:

```
key -> url
value -> durations -> [ { visit: 1, time: 5000, ... } ]
url -> url
```

Each visit is saved starting from 1, and the time is measured in milliseconds.

## Use basic

- Import the library in your project:

```
import { ScreenTimeTracker } from 'screen-time-tracker';
```

- Create an instance to call the desired functions:

```
const tracker = new ScreenTimeTracker();
```

- Start tracking on the current page:

```
tracker.startTracking();
```

- Export data with all the information related to each page:

```
tracker.exportData().then((data) => console.log(data));
```

- Calculate the total time in HH:MM for all saved pages:

```
tracker.calculateTotalTime().then((totalTimes) => console.log(totalTimes));
```

## Example Usage in an App

You can call each function based on the functionality you want to execute. In this example, we start tracking when the page loads, stop tracking when the page unloads, and calculate or export total times based on a button click event.

```
import { ScreenTimeTracker } from "./src/screen-time-tracker.js";

const tracker = new ScreenTimeTracker();

// Start tracking when the page loads
document.addEventListener("DOMContentLoaded", () => {
    tracker.startTracking();

    // Stop tracking when the page is closed
    window.addEventListener("beforeunload", () => {
        tracker.stopTracking();
    });

    // Button to export data
    document.getElementById("exportData").addEventListener("click", () => {
        tracker.stopTracking().then(() => { 
            tracker.exportData().then((data) => {
                console.log("Exported Data:", data);
            });
        });
    });

    // Button to calculate total time for all saved pages
    document.getElementById("calculateTotalTime").addEventListener("click", () => {
        tracker.stopTracking().then(() => {
            tracker.calculateTotalTime().then((times) => {
                console.log("Total Times:", times);
            });
        });
    });
});
```

## Additional Notes

- Ensure the elements with IDs exportData and calculateTotalTime exist in your HTML to use the corresponding buttons.

- Consider handling possible errors and edge cases, such as when no data is available in IndexedDB.

With this setup, you should be able to easily track screen time, export data, and calculate total times for all the pages visited by the user.

## Authors ✒️

* **Jonathan Amaya** - *Systems Engineer - Web Developer* - [TatanLion](https://github.com/TatanLion)

## Acknowledgments 🎁

* Tell others about this project 📢
* Buy a beer 🍺 or a coffee ☕ for someone on the team.
* Give thanks publicly 🤓.
* etc.

---
⌨️ with ❤️ by [TatanLion](https://github.com/TatanLion) 😊