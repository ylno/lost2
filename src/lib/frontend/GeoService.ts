class GeoService {
  async getLocation() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if ("geolocation" in navigator) {
        console.log("geolocation available");
        // Hier können Sie den Code zur Anforderung der Position einfügen
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("position", position);
            resolve(position);
          },
          (error) => {
            console.log("error", error);
            reject();
          },
        );
      } else {
        console.log("Geolocation is not available");
        reject("not available");
      }
    });
  }
}

export const geoService = new GeoService();
