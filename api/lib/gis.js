if (typeof(Number.prototype.toRadians) === "undefined") {
    Number.prototype.toRadians = function() {
      return (this * Math.PI) / 180;
    }
}

const R = 6371e3; // metres

exports.calculateDistance = function(lat1, long1, lat2, long2) {
    const φ1 = lat1.toRadians();
    const φ2 = lat2.toRadians();
    const Δφ = (lat2 - lat1).toRadians();
    const Δλ = (long2 - long1).toRadians();

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c / 1000;
    return Math.round(d * 10) / 10;
}