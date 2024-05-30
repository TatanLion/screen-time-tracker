import { addOrUpdateScreenTime, getScreenTime, getAllScreenTimes,deleteDatabase } from './indexedDB-helper.js';

export class ScreenTimeTracker {
  constructor() {
    this.start = null;
    this.currentPage = window.location.href;
    this.isVisible = !document.hidden;
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  handleVisibilityChange() {
    this.isVisible = !document.hidden;
    if (!this.isVisible) {
      this.stopTracking();
    } else {
      this.startTracking();
    }
  }

  startTracking() {
    if (this.isVisible && !this.start) {
      this.start = new Date();
      this.currentPage = window.location.href;
      console.log("Tracking started for:", this.currentPage);
    }
  }

  stopTracking() {
    if (this.start) {
      const end = new Date();
      const duration = end - this.start;
      const currentPage = this.currentPage;

      return getScreenTime(currentPage)
        .then((existingData) => {
          if (!existingData) {
            existingData = { url: currentPage, durations: [] };
          }
          existingData.durations.push({ visit: existingData.durations.length + 1, time: duration });
          return addOrUpdateScreenTime(existingData);
        })
        .then(() => {
          console.log("Data saved to IndexedDB for URL:", currentPage);
          this.start = null;
        })
        .catch((error) => {
          console.error("IndexedDB error:", error);
          this.start = null;
        });
    }
    return Promise.resolve();
  }

  exportData() {
    return getAllScreenTimes().then((data) => JSON.stringify(data, null, 2));
  }

  calculateTotalTime() {
    return getAllScreenTimes().then((pages) => {
      const totalTimes = {};
      pages.forEach((page) => {
        const totalMilliseconds = page.durations.reduce((acc, curr) => acc + curr.time, 0);
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        totalTimes[page.url] = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      });
      return totalTimes;
    });
  }

  deleteIndexDB(){
    deleteDatabase()
  }
}